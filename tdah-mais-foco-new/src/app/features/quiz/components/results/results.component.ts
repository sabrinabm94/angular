import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ContainerComponent, CommonModule, TranslatePipe, FieldsetComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: Record<string, number> | any = null;
  @Input() userId: string = '';
  @Input() language: string = '';
  areasResults: any[] = [];
  results: any;
  loggedUser: FirebaseUser | null = null;

  constructor(
    private quizService: QuizService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (!this.language) {
      this.language = this.getLanguage();
    }

    if (!this.userId) {
      this.getUser();

      // Busca score de usuário registrado (para logados)
      if (
        this.userId &&
        (!this.score || this.score instanceof Promise === true)
      ) {
        this.score = await this.userService.getUserScore(this.userId);
      }
    }

    // pega resultados do usuário
    await this.ensureResultsLoaded(this.language, this.score, this.userId);

    // Inscrever-se para mudanças de idioma
    this.translateService
      .getLanguageChanged()
      .subscribe(async (currentLanguage: string) => {
        this.language = currentLanguage;
      });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['score'] && changes['score'].currentValue) {
      if (!this.language) {
        this.language = this.getLanguage();
      }

      await this.ensureResultsLoaded(this.language, this.score, this.userId);
    }
  }

  private async ensureResultsLoaded(language: string, score: any, id: string) {
    if (!this.score || !this.language) {
      console.warn(
        'Não é possível carregar resultados: linguagem ou score ausentes.'
      );
      return;
    }

    try {
      await this.loadResults(language, score, id);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  async loadResults(language: string, score: any, id: string) {
    if ((!score || this.score instanceof Promise === true) && id) {
      score = await this.userService
        .getUserScore(this.userId)
        .then((result) => result);
    }

    if (!language) {
      console.warn('Linguagem ausente para carregar os resultados.');
      return;
    }

    try {
      const areaResultsMessages =
        await this.quizService.getResultsMessageByArea(language);
      this.areasResults = await this.quizService.calculateResultsByArea(
        score,
        areaResultsMessages
      );

      const resultsMessages = await this.quizService.getResultsMessage(
        language
      );
      this.results = await this.quizService.calculateResults(
        score,
        resultsMessages
      );
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  private getUser(): string {
    this.loggedUser = this.userService.getUser();
    if (this.loggedUser) {
      this.userId = this.loggedUser.uid;
    } else {
      console.warn('Convidado.');
    }

    return this.userId;
  }

  private getLanguage(): string {
    return (this.language = this.languageService.getLanguage());
  }
}
