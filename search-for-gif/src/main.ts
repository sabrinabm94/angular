/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'pt', 'ptbr'],
        defaultLang: 'ptbr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
}).catch((err) => console.error(err));
