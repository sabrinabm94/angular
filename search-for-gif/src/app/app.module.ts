import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './features/gif-search/pages/not-found-page/not-found-page.component';
import { GifSearchModule } from './features/gif-search/gif-search.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/gif-search/gif-search.module').then(m => m.GifSearchModule) },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    GifSearchModule,
    HttpClientModule
  ],
  providers: [],
})
export class AppModule { }
