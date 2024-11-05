import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslocoModule, NgxPaginationModule],
  exports: [],
})
export class ResultsModule {}
