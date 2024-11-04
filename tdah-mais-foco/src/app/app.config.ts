import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from 'src/transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideTransloco({
    config: {
      availableLangs: ['en', 'es', 'fr', 'ja'],
      defaultLang: environment.lang,
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
    },
    loader: TranslocoHttpLoader
  })]
};
