import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { QuizResultByArea } from '../../../../data/models/quiz/quiz-result-by-area.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { AlertMessageComponent } from '../../../../shared/components/alert-message/alert-message.component';
import { QuizResult } from '../../../../data/models/quiz/quiz-result.interface';
import { AlertService } from '../../../../core/services/alert.service';

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
    RouterModule,
    AlertMessageComponent,
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  public results: QuizResultByArea | null = null;
  public areasResults!: QuizResultByArea[];
  public resultShareUrl: string = '';
  private message: string = `Olá, eu acabei de fazer meu teste de TDAH, faça você também!`;
  public dateResults: string | null = null;

  @Input() score: QuizResultByArea | null = null;
  @Input() userId: string | null = '';
  @Input() languageName: string | null = '';

  constructor(
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    if (this.userId) {
      this.generateUserResultsShareUrl(this.userId);
      await this.getUserQuizScore(this.languageName, this.score);
    }

    // Observa mudanças de idioma
    this.translateService
      .getLanguageChanged()
      .subscribe((currentLanguage: string) => {
        this.languageName = currentLanguage;
        this.getUserQuizScore(this.languageName, this.score);
      });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['score']) {
      await this.getUserQuizScore(this.languageName, this.score);
    }
  }

  private async getUserQuizScore(language: string | null, score: any) {
    if ((!score || score instanceof Promise) && this.userId) {
      score = await this.userService.getUserScore(this.userId);
    }

    try {
      await this.processQuizResultsByScore(language, score);
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'quiz_user_results_processing_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        false
      );
    }
  }

  private async processQuizResultsByScore(language: string | null, score: any) {
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
      const errorMessage = this.translateService.translate(
        'quiz_results_processing_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        false
      );
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
          const errorMessage = this.translateService.translate('share_error');
          this.alertService.alertMessageTriggerFunction(
            errorMessage,
            'error',
            false
          );
        });
    }
  }
}
