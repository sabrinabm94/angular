import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchResultsComponent } from './search-results.component';
import { PictureComponent } from 'src/app/shared/components/picture/picture.component';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [CommonModule, NgxPaginationModule, PictureComponent],
  exports: [SearchResultsComponent]
})
export class SearchResultsModule { }
