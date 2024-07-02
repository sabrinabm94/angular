import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GifSearchModule } from './features/gif-search/gif-search.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    GifSearchModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
