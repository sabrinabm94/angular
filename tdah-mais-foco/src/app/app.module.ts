import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  translocoConfig,
} from '@ngneat/transloco';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

// Importações do Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TranslocoModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'pt', 'pt-br'],
        defaultLang: 'pt-br',
        fallbackLang: 'pt',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
