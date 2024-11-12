import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  providers: [BrowserModule, FormsModule],
  imports: [SharedModule],
  declarations: [],
  exports: [],
})
export class QuizModule {}
