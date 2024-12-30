import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../core/services/translate.service';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  imports: [TranslatePipe],
})
export class SwitchLanguageNavComponent {
  currentLanguage: string = '';

  constructor(private translateService: TranslateService) {
    // Inicializa a linguagem com a padrão do ambiente
    this.currentLanguage = this.translateService.getLanguage();
    this.translateService.setLanguage(this.currentLanguage);
  }

  switchLanguage(language: string): void {
    this.translateService.setLanguage(language).then(() => {
      this.currentLanguage = language; // Atualiza a linguagem ativa
    });
  }

  // Verifica se a linguagem atual é a ativa
  isActive(language: string): boolean {
    return this.currentLanguage === language;
  }
}
