import { TranslocoTranspiler, HashMap, Translation } from '@ngneat/transloco';

export class TranslocoHttpTranspiler implements TranslocoTranspiler {
  transpile(
    value: any,
    params: HashMap = {},
    translation: Translation,
    key: string
  ): any {
    if (typeof value === 'string') {
      return value.replace(
        /\{\{(.*?)\}\}/g,
        (_, matchKey) => params[matchKey.trim()] || ''
      );
    }
    return value;
  }
}
