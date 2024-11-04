// language.service.ts
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(environment.lang);
  language$ = this.languageSubject.asObservable();

  constructor(private translocoService: TranslocoService) {}

  switchLanguage(language: string): void {
    if (language) {
      this.translocoService.setActiveLang(language);
      this.languageSubject.next(language);
    }
  }
}
