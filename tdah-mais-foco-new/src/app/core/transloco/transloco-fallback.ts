import { TranslocoFallbackStrategy } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoFallback implements TranslocoFallbackStrategy {
  getNextLangs(failedLang: string): string[] {
    console.warn(`Idioma falhou: ${failedLang}`);
    return ['en']; // Define o idioma de fallback
  }
}
