import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from './app/core/transloco/transloco-root.module';
import { TranslocoHttpLoader } from './app/core/transloco/transloco-loader';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      TranslocoRootModule,
      TranslocoHttpLoader
    ),
  ],
}).catch((err) => console.error(err));
