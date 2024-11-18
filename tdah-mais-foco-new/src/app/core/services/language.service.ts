import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from './translate.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string = environment.lang;

  constructor(private translateService: TranslateService) {}

  // Método para obter a linguagem atual
  getLanguage(): string {
    return this.currentLanguage;
  }

  // Método para alterar a linguagem
  async switchLanguage(language: string): Promise<void> {
    if (language && language !== this.currentLanguage) {
      try {
        await this.translateService.setLanguage(language); // Carrega as traduções
        this.currentLanguage = language; // Atualiza a linguagem atual
      } catch (error) {
        console.error(`Erro ao carregar idioma ${language}:`, error);
      }
    }
  }
}
