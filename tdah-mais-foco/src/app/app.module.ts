import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  translocoConfig,
} from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpClientModule, TranslocoModule],
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
})
export class AppModule {}
