import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from 'src/transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { environment } from 'src/environments/environment';
import { FirebaseModule } from './firebase.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    FirebaseModule,
    AngularFireAuthModule,
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'fr', 'ja'],
        defaultLang: environment.lang,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
