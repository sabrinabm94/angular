import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { GifService } from 'src/app/core/services/gif.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { TranslocoModule } from '@ngneat/transloco';

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  providers: [GifService, RouterModule],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule,
    HomePageComponent,
    NotFoundPageComponent,
    SearchResultsComponent,
    SearchFormComponent,
  ],
  exports: [
    HomePageComponent,
    NotFoundPageComponent,
    SearchResultsComponent,
    SearchFormComponent,
  ]
})
export class GifSearchModule { }
