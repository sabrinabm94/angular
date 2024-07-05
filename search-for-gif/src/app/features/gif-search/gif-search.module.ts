import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultsTemplateComponent } from './components/results-template/results-template.component';
import { SearchTemplateComponent } from './components/search-template/search-template.component';
import { GifService } from '../../core/services/gif.service';
import { NotFoundComponent } from './pages/not-found-page/not-found.component';

@NgModule({
    declarations: [
        HomePageComponent,
        NotFoundComponent,
        ResultsTemplateComponent,
        SearchTemplateComponent
    ],
    providers: [GifService],
    imports: [
        CommonModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GifSearchModule { }
