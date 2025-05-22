import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Language } from 'src/app/data/interfaces/language.interface';

/**
 * Serviço responsável por gerenciar as configurações de idioma
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: Language | null = null;

  public languagesList: Language[] = [
    {
      id: 1,
      name: 'Portuguese',
      initials: 'ptbr',
    },
    {
      id: 2,
      name: 'English',
      initials: 'en',
    },
    {
      id: 3,
      name: 'Spanish',
      initials: 'es',
    },
  ];

  constructor(private translocoService: TranslocoService) {}

  /**
   * Retorna a lista de idiomas disponíveis na aplicação
   * @returns {Language[]} Lista de idiomas disponíveis
   */
  public getLanguagesList(): Language[] {
    return this.languagesList;
  }

  /**
   * Define um novo idioma ativo
   * @param {Language} language Objeto de idioma a ser ativado
   * @returns {Language | null} O idioma ativado ou null
   */
  public setActiveLanguage(language: Language): Language | null {
    if (language && language.initials) {
      this.translocoService.setActiveLang(language.initials);
      return (this.currentLanguage = language);
    }
    return null;
  }

  /**
   * Retorna o idioma atualmente ativo
   * @returns {Language | null} O idioma ativo ou null
   */
  public getActiveLanguage(): Language | null {
    return this.currentLanguage;
  }
}
