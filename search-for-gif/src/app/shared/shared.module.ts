import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { PictureComponent } from './components/picture/picture.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    InputComponent,
    PictureComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    InputComponent,
    PictureComponent
  ]
})
export class SharedModule { }
