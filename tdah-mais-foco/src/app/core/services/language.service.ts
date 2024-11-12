import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string = environment.lang;

  constructor(private translocoService: TranslocoService) {}

  // Método para obter a linguagem atual
  getLanguage(): string {
    return this.currentLanguage;
  }

  // Método para alterar a linguagem
  switchLanguage(language: string): void {
    if (language) {
      this.translocoService.setActiveLang(language);
      this.currentLanguage = language; // Atualiza a linguagem atual
    }
  }
}
