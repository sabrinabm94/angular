import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_FALLBACK_STRATEGY,
  TRANSLOCO_INTERCEPTOR,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_TRANSPILER,
  translocoConfig,
  TranslocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { environment } from '../../../environments/environment';
import { TranslocoHttpTranspiler } from './transloco-transpiler';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import { TranslocoHandler } from './transloco-handler';
import { TranslocoFallback } from './transloco-fallback';

@NgModule({
  imports: [HttpClientModule, TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'pt', 'pt-br', 'es'],
        defaultLang: 'en',
        fallbackLang: 'en',
        missingHandler: { allowEmpty: false },
      }),
    },
    TranslocoHttpLoader,
    {
      provide: TRANSLOCO_TRANSPILER,
      useClass: TranslocoHttpTranspiler,
    },
    {
      provide: TRANSLOCO_MISSING_HANDLER,
      useClass: TranslocoHandler,
    },
    {
      provide: TRANSLOCO_INTERCEPTOR,
      useValue: {
        preSaveTranslation(translation: any) {
          return translation;
        },
      },
    },
    {
      provide: TRANSLOCO_FALLBACK_STRATEGY,
      useClass: TranslocoFallback, // Usa a classe de fallback corretamente
    },
  ],
})
export class TranslocoRootModule {}
