import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GifService } from 'src/app/api/gif.service';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css'],
  providers: [GifService],
})
export class SearchTemplateComponent implements OnInit {
  @Output() dataEmitter = new EventEmitter<any>();

  @ViewChild('FormComponent', { static: true })
  formComponent!: FormComponent;

  @HostBinding('class') class: string = 'app-search-template';

  public gifs: any[] = [];
  public form: any = null;
  public limitPattern: String = '';
  public termPattern: String = '';
  public error: any;

  constructor(private service: GifService) {}

  ngOnInit() {
    this.createForms();
  }

  async searchByAsync(form: FormGroup) {
    this.error = null;
    let response = await this.service
      .searchGif(form.value.term, form.value.limit)
      .toPromise()
      .catch((error: any) => (this.error = error));
    this.verifyResponse(response.data);
  }

  verifyResponse(response: any): any {
    this.gifs = [];
    if (this.error == null) {
      response.forEach((gif: never) => {
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
        pattern: this.service.termPattern,
      },
      {
        name: 'limit',
        minLength: 1,
        maxLength: 2,
        pattern: this.service.limitPattern,
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
      .searchGifObservable(this.form.value.term, this.form.value.limit)
      .subscribe(
        (response) => this.verifyResponse(response.data),
        (error) => (this.error = error)
      );
  }
}
