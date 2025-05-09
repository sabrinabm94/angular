import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../core/services/translate.service';
import { Language } from '../../../data/models/language.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  imports: [CommonModule, TranslatePipe],
})
export class SwitchLanguageNavComponent {
  currentLanguage: Language | null = null;
  public languagensList: Language[] = [];

  constructor(private translateService: TranslateService) {
    this.languagensList = this.translateService.getLanguagesList();

    // Inicializa a linguagem com a padrão do ambiente
    this.currentLanguage = this.translateService.getActiveLanguage();
  }

  switchLanguage(language: Language): Language | null {
    if (language) {
      this.translateService.setActiveLanguage(language);
      return (this.currentLanguage = language);
    }
    return null;
  }

  // Verifica se a linguagem atual é a ativa
  isActive(language: Language): boolean {
    return this.currentLanguage === language;
  }
}
