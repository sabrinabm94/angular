import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { Language } from 'src/app/data/interfaces/language.interface';
import { TranslatePipe } from 'src/app/core/pipes/translate.pipe';
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

    // Inicializa a linguagem com a padrão do ambiente
    this.currentLanguage = this.languageService.getActiveLanguage();
  }

  switchLanguage(language: Language): Language | null {
    if (language) {
      this.languageService.setActiveLanguage(language);
      return (this.currentLanguage = language);
    }
    return null;
  }

  // Verifica se a linguagem atual é a ativa
  isActive(language: Language): boolean {
    return this.currentLanguage === language;
  }
}
