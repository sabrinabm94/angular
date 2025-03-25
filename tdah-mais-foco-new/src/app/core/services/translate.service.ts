import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations: any = {};
  private currentLanguage: string;
  private languageChanged: BehaviorSubject<string>;

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.currentLanguage = environment.lang || 'pt-br';
    this.languageChanged = new BehaviorSubject(this.currentLanguage);
    this.translations = this.loadTranslations(this.currentLanguage);
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
      const errorMessage = this.translate('language_data_processing_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
  }

  // Obter uma tradução
  translate(key: string): string {
    if (
      key &&
      typeof key === 'string' &&
      this.translations &&
      this.translations[key] &&
      typeof this.translations[key] === 'string'
    ) {
      return this.translations[key];
    }
    console.warn(`Chave de tradução ausente: ${key}`);
    return '';
  }

  translateOrReturnKey(key: string): string | null {
    if (
      key &&
      typeof key === 'string' &&
      this.translations &&
      this.translations[key] &&
      typeof this.translations[key] === 'string'
    ) {
      return this.translations[key];
    }
    return key;
  }

  // Alterar idioma
  async setLanguage(language: string): Promise<void> {
    try {
      this.currentLanguage = language;
      await this.loadTranslations(this.currentLanguage);
      this.languageChanged.next(this.currentLanguage);
    } catch (error) {
      const errorMessage = this.translate('language_change_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
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
