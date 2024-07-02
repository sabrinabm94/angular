import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultsTemplateComponent } from './components/results-template/results-template.component';
import { SearchTemplateComponent } from './components/search-template/search-template.component';
import { GifService } from 'src/app/core/services/gif.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomePageComponent,
    NotFoundComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent
  ],
  providers: [GifService]
})
export class GifSearchModule { }
