import { Component, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';
import { FormComponent } from "../../../../shared/components/form/form.component";
import { GifService } from '../../../../core/services/gif.service';
import { FormGroup } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Gif } from 'src/app/data/models/gif.model';

@Component({
    selector: 'app-search-template',
    standalone: true,
    imports: [FormComponent, InputComponent, ButtonComponent],
    templateUrl: './search-template.component.html',
    styleUrl: './search-template.component.css',
})
export class SearchTemplateComponent {
  @Output() dataEmitter = new EventEmitter<any>();

  @ViewChild('FormComponent', { static: true })
  formComponent!: FormComponent;

  @HostBinding('class') class: string = 'app-search-template';

  public gifs: Gif[] = [];
  public form: any = null;
  public limitPattern: String = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  public termPattern: String = '^[a-zA-Z0-9]*$';
  public error: any;


  constructor(private service: GifService) {}

  ngOnInit() {
    this.createForms();
  }

  async searchByAsync(form: FormGroup) {
    this.error = null;
    let response = await this.service
      .searchGifs(form.value.term, form.value.limit)
      .toPromise()
      .catch((error: any) => (this.error = error));
    this.verifyResponse(response.data, form.value.term);
  }

  verifyResponse(gifsList: any, searchTerm: string): any {
    let dataList = gifsList.data;
    this.gifs = [];

    if (this.error === null) {
      dataList.forEach((data: any) => {
        console.log(data);
        let gif = new Gif(
          searchTerm,
          data.id,
          data.title,
          data.alt_text,
          data.type,
          //data.bitly_gif_url,
          data.images.preview_gif.url,
          data.images.preview_webp.url,
        );
        console.log(gif);

        this.gifs.push(gif);
      });
      this.dataEmitter.emit(this.gifs); //send data to parent by output emmit - to page home
      return this.gifs;
    } else {
      return this.error;
    }
  }

  public createForms() {
    const fields: Object[] = [
      {
        name: 'term',
        minLength: 1,
        maxLength: 10,
        pattern: this.termPattern,
      },
      {
        name: 'limit',
        minLength: 1,
        maxLength: 2,
        pattern: this.limitPattern,
      },
    ];

    //send data from parent by function - from page home
    this.form = this.formComponent.createForm();
    this.form = this.formComponent.createFields(this.form, fields);
  }

  searchBySubscribe($event: any) {
    this.form.value.term = $event.srcElement.form[0].value;
    this.form.value.limit = $event.srcElement.form[1].value;
    $event.preventDefault();
    this.error = null;
    this.service
      .searchGifs(this.form.value.term, this.form.value.limit)
      .subscribe(
        (response) => this.verifyResponse(response, this.form.value.term),
        (error) => (this.error = error)
      );
  }
}
