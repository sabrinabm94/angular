import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-switch-language-nav',
  standalone: true,
  templateUrl: './switch-language-nav.component.html',
  styleUrls: ['./switch-language-nav.component.css'],
  imports: [TranslocoModule],
})
export class SwitchLanguageNavComponent {
  constructor(private languageService: LanguageService) {
    this.languageService.switchLanguage(environment.lang);
  }

  switchLanguage(language: string): void {
    this.languageService.switchLanguage(language);
  }
}
