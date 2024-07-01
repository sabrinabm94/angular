import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { ResultsTemplateComponent } from './features/gif-search/components/results-template/results-template.component';
import { SearchTemplateComponent } from './ui/templates/search-template/search-template.component';
import { NotFoundComponent } from './ui/pages/not-found-page/not-found.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { PictureComponent } from './shared/components/picture/picture.component';
import { InputComponent } from './shared/components/input/input.component';
import { FormComponent } from './shared/components/form/form.component';
import { GifService } from './api/gif.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './core/services/components/header/header.component';
import { FooterComponent } from './core/services/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent,
    NotFoundComponent,
    ButtonComponent,
    PictureComponent,
    InputComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
  ],
  providers: [GifService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
