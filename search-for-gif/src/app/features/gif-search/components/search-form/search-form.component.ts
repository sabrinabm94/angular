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

@Component({
  selector: 'app-search-template',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  private abortController?: AbortController;
  public form: FormGroup;
  public gifs: Gif[] = [];

  @Output() dataEmitter = new EventEmitter<Gif[]>();

  constructor(private fb: FormBuilder, private gifService: GifService) { }

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
   * Handles the form submission. Validates the form, aborts any ongoing request, and makes a new search request to the GifService.
   * @returns {void}
   */
  submit(): void {
    if (this.form.invalid) {
      console.error('Form is invalid');
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

  /**
   * Processes the GIFs received from the search response and emits them via the dataEmitter.
   * @param {Gif[]} gifsList - The list of GIFs returned from the API.
   * @param {string} searchTerm - The term used for the search.
   * @returns {void}
   */
  handleResponse(gifsList: any, searchTerm: string): any {
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
      this.dataEmitter.emit(this.gifs); //send data to parent by output emmit - to page home
      return this.gifs;
    }
  }

  /**
   * Lifecycle hook that is called when the directive is destroyed.
   * Aborts any ongoing search request to avoid memory leaks.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.abortController?.abort();
  }
}
