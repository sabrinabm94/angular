import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';
import { NotFoundComponent } from './features/gif-search/pages/not-found-page/not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
