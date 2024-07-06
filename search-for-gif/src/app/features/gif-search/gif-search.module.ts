import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultsTemplateComponent } from './components/results-template/results-template.component';
import { SearchTemplateComponent } from './components/search-template/search-template.component';
import { NotFoundComponent } from './pages/not-found-page/not-found.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [
    HomePageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
    NotFoundComponent
  ]
})
export class GifSearchModule { }
