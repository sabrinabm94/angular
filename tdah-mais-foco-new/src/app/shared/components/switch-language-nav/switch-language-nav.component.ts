import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  imports: [TranslatePipe],
})
export class SwitchLanguageNavComponent {
  currentLanguage: string;

  constructor(private languageService: LanguageService) {
    // Inicializa a linguagem com a padrão do ambiente
    this.currentLanguage = environment.lang;
    this.languageService.switchLanguage(this.currentLanguage);
  }

  switchLanguage(language: string): void {
    this.languageService.switchLanguage(language);
    this.currentLanguage = language; // Atualiza a linguagem ativa
  }

  // Verifica se a linguagem atual é a ativa
  isActive(language: string): boolean {
    return this.currentLanguage === language;
  }
}
