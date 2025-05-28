import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { Language } from 'src/app/data/interfaces/language.interface';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  imports: [CommonModule, TranslocoModule],
})
export class SwitchLanguageNavComponent {
  public currentLanguage: Language | null = null;
  public languagensList: Language[] = [];

  constructor(private languageService: LanguageService) {
    this.languagensList = this.languageService.getLanguagesList();
    this.currentLanguage = this.languageService.getActiveLanguage();
  }

  /**
   * Altera o idioma ativo da aplicação.
   *
   * @param language - Objeto contendo os dados do idioma selecionado.
   * @returns O idioma definido como atual ou null se não definido.
   */
  switchLanguage(language: Language): Language | null {
    if (language) {
      this.languageService.setActiveLanguage(language);
      return (this.currentLanguage = language);
    }
    return null;
  }

  /**
   * Verifica se o idioma fornecido é o idioma atualmente ativo.
   *
   * @param language - Idioma a ser comparado.
   * @returns true se o idioma for o ativo, caso contrário false.
   */
  isActive(language: Language): boolean {
    return this.currentLanguage === language;
  }
}
