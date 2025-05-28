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
  private currentLanguage: Language | null = null;
  private languageChanged: BehaviorSubject<Language> | undefined;
  public languagesList: Language[] = [
    {
      id: 0,
      name: 'portuguese',
      initials: 'pt-br',
    },
    {
      id: 1,
      name: 'english',
      initials: 'en',
    },
    {
      id: 2,
      name: 'spanish',
      initials: 'es',
    },
  ];
  private languageChangeListeners: ((lang: Language) => void)[] = [];

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.getInitialTranslations().then((translations) => translations);
  }

  async ngOnInit() {
    await this.getInitialTranslations();
  }

  public async getInitialTranslations(): Promise<void> {
    this.currentLanguage = this.getLanguageById(
      environment.defaultLanguageId ? environment.defaultLanguageId : 0
    );

    if (this.currentLanguage) {
      this.setLanguageChanged(this.currentLanguage);
      await this.loadTranslations(this.currentLanguage);
    }
  }

  // Carregar um arquivo de idioma
  async loadTranslations(language: Language): Promise<void> {
    if (language && language.initials) {
      try {
        const data: any = await lastValueFrom(
          this.http.get(`/assets/i18n/${language.initials}.json`)
        );
        this.translations = data;

        if (this.languageChanged) {
          this.languageChanged.next(language);
        }
      } catch (error) {
        const errorMessage = this.translate('language_data_processing_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
  }

  // Obter uma tradução
  public translate(key: string): string {
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

  public translateOrReturnKey(key: string): string | null {
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

  //listagem de idiomas disponivel
  public getLanguagesList(): Language[] {
    return this.languagesList;
  }

  // idioma ativo
  public setActiveLanguage(language: Language): Language | null {
    if (language) {
      this.languageChangeListeners.forEach((callback) => callback(language));
      return (this.currentLanguage = language);
    }
    return null;
  }

  public getActiveLanguage(): Language | null {
    if (this.currentLanguage) {
      return this.currentLanguage;
    }
    return null;
  }

  //idioma
  public getLanguageById(languageId: number): Language | null {
    const languageFound = this.languagesList.find(
      (language: Language) => language.id === languageId
    );
    return languageFound ?? null;
  }

  public getLanguageByLanguage(languageToSearch: Language): Language {
    if (languageToSearch && languageToSearch.id) {
      const languageFound = this.getLanguageById(languageToSearch.id);
      if (languageFound) {
        return languageFound;
      }
    }
    return languageToSearch;
  }

  // Observable para escutar as mudanças de idioma
  public onLanguageChange(listener: (lang: Language) => void) {
    this.languageChangeListeners.push(listener);
  }

  public translateQuestionByLanguageId(
    question: QuizQuestion,
    languageId: number
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
      (q) => q.language.id === languageId
    );

    if (translation) {
      return translation.question;
    }

    // Fallback: tenta retornar em português brasileiro
    const fallback = question.questions.find(
      (q) => q.language.id === environment.defaultLanguageId
    );

    return '';
  }

  public setLanguageChanged(
    currentLanguage: Language
  ): BehaviorSubject<Language> | null {
    if (currentLanguage) {
      return (this.languageChanged = new BehaviorSubject(currentLanguage));
    }
    return null;
  }
}
