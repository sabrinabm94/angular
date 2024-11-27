import { Component, Input } from '@angular/core';
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
  imports: [
    ContainerComponent,
    CommonModule,
    TranslatePipe,
    ButtonComponent,
    FieldsetComponent,
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: Record<string, number> | any = null;
  @Input() userId: string = '';
  areasResults: any[] = [];
  results: any;
  language: string = '';
  loggedUser: FirebaseUser | null = null;

  constructor(
    private quizService: QuizService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();

    // Verifica se o usuário está logado
    if (!this.userId) {
      this.loggedUser = this.userService.getUser();
      if (this.loggedUser) {
        console.log('Usuário logado:', this.loggedUser);
        this.userId = this.loggedUser.uid;
      } else {
        console.warn('Convidado.');
      }
    }

    // Se não houver score e userId, obtém a pontuação do usuário
    if (!this.score && this.userId) {
      console.log(this.userId);
      this.userService
        .getUserScore(this.userId)
        .then((userScore) => {
          this.score = userScore;
          this.loadResults(this.language, userScore);
        })
        .catch((error) => {
          console.error('Erro ao buscar pontuação do usuário:', error);
        });
    }

    // Inscrever-se para mudanças de idioma
    this.translateService.getLanguageChanged().subscribe((language) => {
      this.language = language;
      // Recarrega os resultados com o novo idioma e o score
      this.loadResults(this.language, this.score);
    });
  }

  async loadResults(language: string, score: any): Promise<void> {
    console.log('language ', language);
    console.log('score', score);

    if (language && score) {
      try {
        this.areasResults = await this.quizService
          .getResultsMessageByArea(language)
          .then((areaResultsMessages) => {
            console.log('areaResultsMessages ', areaResultsMessages);
            return this.quizService.calculateResultsByArea(
              score,
              areaResultsMessages
            );
          });

        this.results = await this.quizService
          .getResultsMessage(language)
          .then((resultsMessages) => {
            console.log('resultsMessages ', resultsMessages);
            return this.quizService.calculateResults(score, resultsMessages);
          });

        console.log('this.areasResults: ', this.areasResults);
        console.log('this.results: ', this.results);
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
      }
    }
  }
}
