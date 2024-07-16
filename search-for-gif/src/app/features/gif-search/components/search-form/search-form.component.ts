import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gif } from 'src/app/data/models/gif.model';
import { GifService } from 'src/app/core/services/gif.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public form: FormGroup;
  public gifs: Gif[] = [];

  @Output() dataEmitter = new EventEmitter<Gif[]>();

  constructor(private fb: FormBuilder, private gifService: GifService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      term: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      limit: [null, [Validators.min(1), Validators.max(10)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const termValue = this.form.get('term')?.value;
      const limitValue = this.form.get('limit')?.value;
      console.log('Term:', termValue);
      console.log('Limit:', limitValue);

      if (!termValue) {
        console.error('Form values are invalid');
      }

      this.gifService.searchGifs(termValue, limitValue).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.verifyResponse(response, termValue);
        } else {
          console.error('No gifs found.');
        }
      },
      (error) => {
        console.error('Error fetching gifs: ' + error.message);
      }
    );

    } else {
      console.error('Form is invalid');
    }
  }

  verifyResponse(gifsList: any, searchTerm: string): any {
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
          data.images.preview_webp.url,
        );

        this.gifs.push(gif);
      });
      this.dataEmitter.emit(this.gifs); //send data to parent by output emmit - to page home
      return this.gifs;
    }
  }
}
