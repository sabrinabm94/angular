import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
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

  /** Formulário reativo utilizado para coletar os dados de busca. */
  public form: FormGroup;

  /** Array para armazenar os resultados de GIFs da busca. */
  public gifs = signal<Gif[]>([]);

  /** Evento emitido quando novos GIFs são obtidos da API, enviado para o componente pai. */
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

  submit(): void {
    if (this.form.invalid) {
      console.error('Formulário inválido');
      return;
    }

    const { term, limit } = this.form.value;

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    this.gifService.searchGifs(term, limit)
      .then((response) => this.handleResponse(response, term))
      .catch((error) => console.error(error.message));
  }

  handleResponse(gifsList: any, searchTerm: string): Gif[] {
    let dataList = gifsList;
    const newGifs: Gif[] = [];

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

        newGifs.push(gif);
      });
      this.gifs.set(newGifs);
      this.dataEmitter.emit(newGifs);
      return newGifs;
    }
    return [];
  }

  ngOnDestroy(): void {
    this.abortController?.abort();
  }
}
