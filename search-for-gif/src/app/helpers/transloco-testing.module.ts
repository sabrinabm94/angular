import { TranslocoTestingModule } from '@ngneat/transloco';

export function GetTranslocoTestingModule() {
  return TranslocoTestingModule.forRoot({
    langs: { en: {} },
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en',
      reRenderOnLangChange: true,
      prodMode: true
    }
  });
}
