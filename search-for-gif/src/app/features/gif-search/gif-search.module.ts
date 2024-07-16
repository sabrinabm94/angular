import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { GifService } from 'src/app/core/services/gif.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  providers: [GifService, RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    HttpClientModule,
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
