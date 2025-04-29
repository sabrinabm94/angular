import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Language } from 'src/app/data/interfaces/language.interface';

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

  /**
   * Cria uma instância de LanguageService.
   * @param translocoService - Serviço Transloco para gerenciar a tradução e mudança de idioma.
   */
  constructor(private translocoService: TranslocoService) {}

  //listagem de idiomas disponivel
  public getLanguagesList(): Language[] {
    return this.languagesList;
  }

  // idioma ativo
  public setActiveLanguage(language: Language): Language | null {
    if (language && language.initials) {
      console.log('setActiveLanguage ', language);
      this.translocoService.setActiveLang(language.initials);
      return (this.currentLanguage = language);
    }
    return null;
  }

  public getActiveLanguage(): Language | null {
    if (this.currentLanguage) {
      return this.currentLanguage;
    }
    return null;
  }
}
