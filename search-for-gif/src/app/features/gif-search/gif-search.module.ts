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

const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    HomePageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent
  ],
  providers: [GifService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    HttpClientModule,
    SharedModule
  ]
})
export class GifSearchModule { }
