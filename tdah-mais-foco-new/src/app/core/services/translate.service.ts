import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations: any = {};
  private currentLanguage: string;
  private languageChanged: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.currentLanguage = environment.lang || 'pt-br';
    this.languageChanged = new BehaviorSubject(this.currentLanguage);
  }

  // Carregar um arquivo de idioma
  async loadTranslations(language: string): Promise<void> {
    try {
      const data: any = await lastValueFrom(
        this.http.get(`/assets/i18n/${language}.json`)
      );
      this.currentLanguage = language;
      this.translations = data;
      this.languageChanged.next(this.currentLanguage); // Notifica os inscritos
    } catch (error) {
      console.error(
        `Erro ao carregar traduções para o idioma ${language}:`,
        error
      );
      throw new Error(`Falha ao carregar o idioma: ${language}`);
    }
  }

  // Obter uma tradução
  translate(key: string): string {
    if (!this.translations || !this.translations[key]) {
      console.warn(`Chave de tradução ausente: ${key}`);
      return `[${key}]`; // Placeholder para chaves ausentes
    }
    return this.translations[key];
  }

  // Alterar idioma
  async setLanguage(language: string): Promise<void> {
    try {
      this.currentLanguage = language;
      await this.loadTranslations(this.currentLanguage);
      this.languageChanged.next(this.currentLanguage);
    } catch (error) {
      console.error(`Erro ao alterar idioma para ${language}:`, error);
    }
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  // Observable para escutar as mudanças de idioma
  getLanguageChanged() {
    return this.languageChanged.asObservable();
  }
}
