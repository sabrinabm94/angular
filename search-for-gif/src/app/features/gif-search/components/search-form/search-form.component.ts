import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gif } from 'src/app/data/interfaces/gif.model';
import { GifService } from 'src/app/core/services/gif.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import {
  INVALID_FORM_FIELDS_DATA_ERROR,
  SEARCH_REQUEST_ERROR,
} from 'src/app/data/const';
import { GifBackend } from 'src/app/data/models/gif-backend';

/**
 * O `SearchFormComponent` é responsável por exibir um formulário de busca de GIFs.
 * Valida a entrada do usuário, envia a busca para o serviço `GifService` e emite os resultados para o componente pai.
 */
@Component({
  selector: 'app-search-template',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslocoModule],
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public abortController?: AbortController;
  public form: FormGroup;
  public gifs: Gif[] = [];
  private readonly DEFAULT_GIF_SEARCH_LIMIT: number = 10;
  private readonly DEFAULT_FORM_FIELD_MIN_LIMIT: number = 1;
  public readonly DEFAULT_FORM_FIELD_MAX_LIMIT: number = 50;
  @Output() dataEmitter = new EventEmitter<Gif[]>();

  constructor(private fb: FormBuilder, private gifService: GifService) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Realiza a criação do formulário de busca.
   * Cria os campos do formulário com suas respectivas validações.
   * @returns {FormGroup} formulário
   */
  private createForm(): FormGroup {
    return (this.form = this.fb.group({
      term: [
        '',
        [
          Validators.required,
          Validators.minLength(this.DEFAULT_FORM_FIELD_MIN_LIMIT),
          Validators.maxLength(this.DEFAULT_FORM_FIELD_MAX_LIMIT),
        ],
      ],
      limit: [null, [Validators.min(1), Validators.max(10)]],
    }));
  }

  /**
   * Realiza a submissão do formulário de busca.
   * Valida o formulário, cancela qualquer requisição de busca anterior e realiza uma nova busca no `GifService`.
   * @returns {void}
   */
  async submit(): Promise<void> {
    if (this.form.invalid) {
      console.error(INVALID_FORM_FIELDS_DATA_ERROR);
      return;
    }

    let { term, limit } = this.form.value;

    if (!limit || limit == 0) {
      limit = this.DEFAULT_GIF_SEARCH_LIMIT;
    }

    // cria o controler para ser possível cancelar a requisição, se necessário
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const response: GifBackend[] = await this.gifService.searchGifs(
        term,
        limit
      );
      if (response) {
        this.handleResponse(response, term);
      }
    } catch (error) {
      console.error(SEARCH_REQUEST_ERROR + ' :', error.message);
    }
  }

  /**
   * Processa os GIFs recebidos da API e os emite via o `dataEmitter`.
   * @param {any} gifsList - Lista de GIFs retornada pela API.
   * @param {string} searchTerm - O termo de busca utilizado.
   * @returns {Gif[]} - Lista de GIFs processada e emitida para o componente pai.
   */
  handleResponse(gifsList: GifBackend[], searchTerm: string): Gif[] {
    let dataList: GifBackend[] = gifsList;
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
   * Cancela qualquer requisição de busca ativa para evitar vazamento de memória ao destruir o componente
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.abortController?.abort();
  }
}
