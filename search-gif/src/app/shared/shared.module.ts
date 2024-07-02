import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonComponent } from './components/button/button.component';
import { PictureComponent } from './components/picture/picture.component';
import { InputComponent } from './components/input/input.component';
import { FormComponent } from './components/form/form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  declarations: [
    ButtonComponent,
    PictureComponent,
    InputComponent,
    FormComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    ButtonComponent,
    PictureComponent,
    InputComponent,
    FormComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
