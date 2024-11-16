import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoModule } from '@ngneat/transloco';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(HttpClientModule, TranslocoModule),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
