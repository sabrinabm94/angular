import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PictureComponent } from 'src/app/shared/components/picture/picture.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslocoModule, NgxPaginationModule, PictureComponent],
  exports: []
})
export class SearchResultsModule { }
