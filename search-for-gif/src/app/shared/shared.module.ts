import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './components/picture/picture.component';

@NgModule({
  imports: [
    CommonModule,
    PictureComponent
  ],
  exports: [
    PictureComponent
  ]
})
export class SharedModule { }
