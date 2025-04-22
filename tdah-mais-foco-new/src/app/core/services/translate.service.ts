import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AlertService } from './alert.service';
import { Language } from '../../data/models/language.interface';
import { QuizQuestion } from '../../data/models/quiz/quiz-question.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translations: any = {};
  private currentLanguageInitial: string;
  private languageChanged: BehaviorSubject<string>;

  public languagesList: Language[] = [
    {
      id: 1,
      name: 'portuguese',
      initials: 'pt-br',
    },
    {
      id: 2,
      name: 'english',
      initials: 'en',
    },
    {
      id: 3,
      name: 'spanish',
      initials: 'es',
    },
  ];

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.currentLanguageInitial = environment.lang || 'pt-br';
    this.languageChanged = new BehaviorSubject(this.currentLanguageInitial);
    this.translations = this.loadTranslations(this.currentLanguageInitial);
  }

  // Carregar um arquivo de idioma
  async loadTranslations(language: string): Promise<void> {
    try {
      const data: any = await lastValueFrom(
        this.http.get(`/assets/i18n/${language}.json`)
      );
      this.currentLanguageInitial = language;
      this.translations = data;
      this.languageChanged.next(this.currentLanguageInitial); // Notifica os inscritos
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
      this.currentLanguageInitial = language;
      await this.loadTranslations(this.currentLanguageInitial);
      this.languageChanged.next(this.currentLanguageInitial);
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
    return this.currentLanguageInitial;
  }

  // Observable para escutar as mudanças de idioma
  getLanguageChanged() {
    return this.languageChanged.asObservable();
  }

  public getLanguagesList(): Language[] {
    return this.languagesList;
  }

  public translateQuestionByLanguage(
    question: QuizQuestion,
    languageInitial: string
  ): string {
    if (
      !question ||
      !question.questions ||
      !Array.isArray(question.questions)
    ) {
      return '';
    }

    // Procura a pergunta pela inicial do idioma
    const translation = question.questions.find(
      (q) => q.language.initials === languageInitial
    );

    if (translation) {
      return translation.question;
    }

    // Fallback: tenta retornar em português brasileiro
    const fallback = question.questions.find(
      (q) => q.language.initials === 'pt-br'
    );
    if (fallback) {
      console.warn(
        `Tradução não encontrada para '${languageInitial}', usando 'pt-br'.`
      );
      return fallback.question;
    }

    // Se não tiver nem fallback, retorna string vazia
    console.warn(`Nenhuma tradução encontrada para a pergunta.`);
    return '';
  }

  public getLanguageById(languageToSearch: Language): Language {
    if (languageToSearch && languageToSearch.id) {
      const languageToSearchId: number = languageToSearch.id;
      const languageFound = this.getLanguagesList().find(
        (language: Language) => language.id === languageToSearchId
      );
      return languageFound ? languageFound : languageToSearch;
    }
    return languageToSearch;
  }
}
