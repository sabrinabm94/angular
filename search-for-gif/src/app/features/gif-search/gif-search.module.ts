import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { GifService } from 'src/app/core/services/gif.service';
import { ResultsTemplateComponent } from './components/results-template/results-template.component';
import { SearchTemplateComponent } from './components/search-template/search-template.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { GifSearchRoutingModule } from './gif-search-routing.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundPageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
  ],
  providers: [GifService, RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    HttpClientModule,
    SharedModule,
    HomePageComponent,
    NotFoundPageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
  ],
  exports: [
    HomePageComponent,
    NotFoundPageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
  ]
})
export class GifSearchModule { }
