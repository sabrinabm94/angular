import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchLanguageNavComponent {
  /**
   * Cria uma instância de SwitchLanguageNavComponent.
   * @param languageService - Serviço de linguagem para alterar o idioma da aplicação.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.switchLanguage('en'); // Idioma padrão
  }

  /**
   * Alterna o idioma da aplicação usando o serviço LanguageService.
   * @param language - O idioma a ser definido (ex.: 'en', 'pt').
   */
  switchLanguage(language: string): void {
    this.languageService.switchLanguage(language);
  }
}
