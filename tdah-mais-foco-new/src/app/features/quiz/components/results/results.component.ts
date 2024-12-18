import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { QuizResult } from '../../../../data/models/quizResult.interface';
import { QuizResultByArea } from '../../../../data/models/quizResultByArea.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    TranslatePipe,
    DatePipe,
    FieldsetComponent,
    ButtonComponent,
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  public results: QuizResult | null = null;
  public areasResults!: QuizResultByArea[];
  public resultShareUrl: string = '';
  private message: string = `Olá, eu acabei de fazer meu teste de TDAH, faça você também!`;
  public dateResults: string | null = null;

  @Input() score: QuizResult | null = null;
  @Input() userId: string | null = '';
  @Input() languageName: string | null = '';

  constructor(
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (this.userId) {
      this.generateUserResultsShareUrl(this.userId);
      await this.initializeResults(this.languageName, this.score);
    }

    this.translateService
      .getLanguageChanged()
      .subscribe(async (currentLanguage: string | null) => {
        this.languageName = currentLanguage;

        await this.initializeResults(this.languageName, this.score);
      });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['score']) {
      await this.initializeResults(this.languageName, this.score);
    }
  }

  private async initializeResults(language: string | null, score: any) {
    if (!score || score instanceof Promise) {
      score = await this.userService.getUserScore();
    }

    try {
      await this.ensureResultsLoaded(language, score);
    } catch (error) {
      console.error('Erro ao inicializar os resultados:', error);
    }
  }

  private async ensureResultsLoaded(language: string | null, score: any) {
    try {
      await this.loadResults(language, score);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  private async loadResults(language: string | null, score: any) {
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
      this.dateResults = this.quizService.getQuizDate(score);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  private generateUserResultsShareUrl(id: string): string {
    if (id) {
      this.resultShareUrl = `${window.location.origin}/result/${id}`;
    }

    return this.resultShareUrl;
  }

  public shareResults() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Confira meus resultados!',
          text: this.message,
          url: this.resultShareUrl,
        })
        .catch((error) => {
          console.error('Erro ao compartilhar:', error);
        });
    }
  }
}
