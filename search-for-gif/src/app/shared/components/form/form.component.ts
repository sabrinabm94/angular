import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [ReactiveFormsModule]
})
export class FormComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  @HostBinding('class') hostClass: string = 'app-form';

  @Input() id: string = '';
  @Input() class: string = '';
  @Input() name: string = '';
  @Input() formGroup: FormGroup;

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.formGroup) {
      throw new Error('FormGroup is required for FormComponent');
    }
    this.form = this.formGroup;
  }

  public createForm(fields: any): FormGroup {
    const group: any = {};

    Object.keys(fields).forEach(field => {
      if (typeof fields[field] === 'object' && !Array.isArray(fields[field])) {
        group[field] = this.createForm(fields[field]);
      } else {
        group[field] = new FormControl(fields[field].value, fields[field].validators || []);
      }
    });

    return this.fb.group(group);
  }

  getFieldValue(fieldName: string) {
    const formValue = this.form.get(fieldName);
    return formValue ? formValue.value : null;
  }

  setFieldValue(fieldName: string, fieldValue: any) {
    const field = this.form.get(fieldName);
    if (field) {
      field.setValue(fieldValue);
    }
  }
}
