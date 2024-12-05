import { Component, Input, SimpleChanges } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
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
  @Input() userId: string | null = '';
  @Input() language: string = '';
  areasResults: any[] = [];
  results: any;
  loggedUser: FirebaseUser | null = null;

  constructor(
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (!this.userId) {
      console.warn(
        'ID do usuário não está definido. Tentando obter o usuário autenticado...'
      );

      this.userId = this.getUserId();
    }

    if (!this.userId) {
      console.error('ID do usuário inválido ou não encontrado.');
      return;
    }

    await this.initializeResults(this.userId, this.language, this.score);

    this.translateService
      .getLanguageChanged()
      .subscribe(async (currentLanguage: string) => {
        this.language = currentLanguage;
        await this.initializeResults(this.userId, this.language, this.score);
      });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] || changes['score']) {
      await this.initializeResults(this.userId, this.language, this.score);
    }
  }

  private async initializeResults(
    id: string | null,
    language: string,
    score: any
  ) {
    if (!id) {
      console.error('ID do usuário não encontrado.');
      return;
    }

    if (!score || score instanceof Promise) {
      score = await this.userService.getUserScore();
    }

    try {
      await this.ensureResultsLoaded(language, score, id);
    } catch (error) {
      console.error('Erro ao inicializar os resultados:', error);
    }
  }

  private async ensureResultsLoaded(language: string, score: any, id: string) {
    try {
      await this.loadResults(language, score, id);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  private async loadResults(language: string, score: any, id: string) {
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

  private getUserId(): string | null {
    const user = this.userService.getUser();
    this.userId = user ? user.uid : null;

    return this.userId;
  }
}
