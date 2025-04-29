import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gif } from 'src/app/data/models/gif.model';
import { GifService } from 'src/app/core/services/gif.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * O `SearchFormComponent` é responsável por exibir um formulário de busca de GIFs.
 * Ele valida a entrada do usuário, envia a busca para o serviço `GifService` e emite os resultados para o componente pai.
 */
@Component({
  selector: 'app-search-template',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslocoModule],
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private abortController?: AbortController;
  public form: FormGroup;
  public gifs: Gif[] = [];
  @Output() dataEmitter = new EventEmitter<Gif[]>();

  constructor(private fb: FormBuilder, private gifService: GifService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      term: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      limit: [null, [Validators.min(1), Validators.max(10)]],
    });
  }

  /**
   * Realiza a submissão do formulário de busca.
   * Valida o formulário, cancela qualquer requisição de busca anterior e realiza uma nova busca no `GifService`.
   * @returns {void}
   */
  submit(): void {
    if (this.form.invalid) {
      console.error('Formulário inválido');
      return;
    }

    let { term, limit } = this.form.value;

    if (!limit || limit == 0) {
      limit = 10;
    }

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    this.gifService
      .searchGifs(term, limit)
      .then((response) => this.handleResponse(response, term))
      .catch((error) => console.error(error.message));
  }

  /**
   * Processa os GIFs recebidos da API e os emite via o `dataEmitter`.
   * @param {any} gifsList - Lista de GIFs retornada pela API.
   * @param {string} searchTerm - O termo de busca utilizado.
   * @returns {Gif[]} - Lista de GIFs processada e emitida para o componente pai.
   */
  handleResponse(gifsList: any, searchTerm: string): Gif[] {
    let dataList = gifsList;
    this.gifs = [];

    if (dataList) {
      dataList.forEach((data: any) => {
        let gif = new Gif(
          searchTerm,
          data.id,
          data.title,
          data.alt_text,
          data.type,
          data.images.preview_gif.url,
          data.images.preview_webp.url
        );

        this.gifs.push(gif);
      });
      this.dataEmitter.emit(this.gifs); // Envia os GIFs processados para o componente pai
      return this.gifs;
    }
    return [];
  }

  /**
   * Lifecycle hook do Angular chamado quando o componente é destruído.
   * Aborta qualquer requisição de busca ativa para evitar vazamento de memória.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.abortController?.abort();
  }
}
