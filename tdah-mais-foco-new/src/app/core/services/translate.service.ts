import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations: any = {};
  private currentLang: string;
  private languageChanged: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.currentLang = environment.lang || 'pt-br';
    this.languageChanged = new BehaviorSubject(this.currentLang);
  }

  // Carregar um arquivo de idioma
  async loadTranslations(lang: string): Promise<void> {
    try {
      const data: any = await lastValueFrom(
        this.http.get(`/assets/i18n/${lang}.json`)
      );
      this.currentLang = lang;
      this.translations = data;
      this.languageChanged.next(this.currentLang); // Notifica os inscritos
    } catch (error) {
      console.error(`Erro ao carregar traduções para o idioma ${lang}:`, error);
      throw new Error(`Falha ao carregar o idioma: ${lang}`);
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
  async setLanguage(lang: string): Promise<void> {
    try {
      await this.loadTranslations(lang);
    } catch (error) {
      console.error(`Erro ao alterar idioma para ${lang}:`, error);
    }
  }

  // Observable para escutar as mudanças de idioma
  getLanguageChanged() {
    return this.languageChanged.asObservable();
  }
}
