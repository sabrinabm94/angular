import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './components/picture/picture.component';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { FormComponent } from './components/form/form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ButtonComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    InputComponent,
    PictureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    InputComponent,
    PictureComponent,
  ]
})
export class SharedModule { }
