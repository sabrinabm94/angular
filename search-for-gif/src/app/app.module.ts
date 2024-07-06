import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './features/gif-search/pages/not-found-page/not-found.component';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configurar rotas
  ],
  providers: []
})
export class AppModule { }
