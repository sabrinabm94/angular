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
  @Input() userId: string = '';
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
    if (this.userId) {
      if (!this.score || this.score instanceof Promise === true) {
        this.score = await this.userService.getUserScore(this.userId);
      }
    }

    await this.ensureResultsLoaded(this.language, this.score, this.userId);

    this.translateService
      .getLanguageChanged()
      .subscribe(async (currentLanguage: string) => {
        this.language = currentLanguage;
      });
  }

  // atualiza valores do componente caso alterar o usuário logado ou resultados do quiz
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.score = await this.userService.getUserScore(this.userId);
      await this.ensureResultsLoaded(this.language, this.score, this.userId);
    }

    if (changes['score']?.currentValue) {
      await this.ensureResultsLoaded(this.language, this.score, this.userId);
    }
  }

  private async ensureResultsLoaded(language: string, score: any, id: string) {
    try {
      await this.loadResults(language, score, id);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
    }
  }

  async loadResults(language: string, score: any, id: string) {
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
}
