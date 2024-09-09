import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /**
   * Cria uma instância de LanguageService.
   * @param translocoService - Serviço Transloco para gerenciar a tradução e mudança de idioma.
   */
  constructor(private translocoService: TranslocoService) {}

  /**
   * Altera o idioma ativo da aplicação.
   * @param language - Código do idioma (ex.: 'en', 'pt').
   */
  switchLanguage(language: string): void {
    this.translocoService.setActiveLang(language);
  }
}
