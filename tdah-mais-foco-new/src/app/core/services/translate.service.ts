import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations: any = {};
  private currentLang: string = 'pt-br';
  private languageChanged: BehaviorSubject<string> = new BehaviorSubject(
    this.currentLang
  );

  constructor(private http: HttpClient) {}

  // Carregar um arquivo de idioma
  loadTranslations(lang: string): Promise<void> {
    return this.http
      .get(`/assets/i18n/${lang}.json`)
      .toPromise()
      .then((data: any) => {
        this.currentLang = lang;
        this.translations = data;
        this.languageChanged.next(this.currentLang); // Notifica os inscritos
      });
  }

  // Obter uma tradução
  translate(key: string): string {
    if (!this.currentLang) {
      this.currentLang = environment.lang;
    }

    if (this.translations) {
      return this.translations[key];
    }

    return key;
  }

  // Alterar idioma
  setLanguage(lang: string): Promise<void> {
    return this.loadTranslations(lang);
  }

  // Observable para escutar as mudanças de idioma
  getLanguageChanged() {
    return this.languageChanged.asObservable();
  }
}
