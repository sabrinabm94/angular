import {
  TranslocoMissingHandler,
  TranslocoMissingHandlerData,
} from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHandler implements TranslocoMissingHandler {
  handle(
    key: string,
    data: TranslocoMissingHandlerData,
    params?: Record<string, any>
  ): any {
    console.warn(`Tradução ausente: ${key} no idioma ${data.activeLang}`);
    return key; // Retorna a própria chave como fallback
  }
}
