import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @HostBinding('class') hostClass: string = 'app-form';

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() name: string = '';

  form: any = null;

  fields: Object[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  public createForm(): FormGroup {
    this.form = new FormGroup({});
    this.form.reset();
    return this.form;
  }

  public createFields(form: FormGroup, fields: any[]) {
    form = new FormGroup({});
    fields.forEach((field: any) => {
      form.addControl(
        field.name,
        new FormControl(field.name, [
          Validators.minLength(field.minLength),
          Validators.maxLength(field.maxLength),
          //Validators.required,
        ])
      );
    });
    return form;
  }
}
