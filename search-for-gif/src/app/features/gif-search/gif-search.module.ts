import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultsTemplateComponent } from './components/results-template/results-template.component';
import { SearchTemplateComponent } from './components/search-template/search-template.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule
  ]
})
export class GifSearchModule { }
