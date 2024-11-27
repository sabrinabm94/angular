import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ContainerComponent,
    FieldsetComponent,
    ButtonComponent,
    ErrorMessageComponent,
    TranslatePipe,
  ],
  providers: [LanguageService],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  questions: any = [];
  score: Record<string, number> = {};
  submitted: boolean = false;
  currentStep: number = 0; // Etapa atual
  maxSteps: number = 3;
  responses: Record<number, any> = {}; // Armazena respostas por etapa
  language: string = '';
  userId: string = ''; // ID do usuário obtido da URL
  loggedUser: FirebaseUser | null = null;

  @Output() results = new EventEmitter<Record<string, number>>();

  constructor(
    private router: Router,
    private quizService: QuizService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.language = this.languageService.getLanguage();

    // Busca usuário pelo id
    if (!this.userId) {
      this.loggedUser = this.userService.getUser();
      if (this.loggedUser) {
        console.log('Usuário logado:', this.loggedUser);
        this.userId = this.loggedUser.uid;
      } else {
        console.log('Convidado.');
      }
    }

    // Carrega perguntas
    this.loadQuizQuestions(this.language);

    // Observa mudanças de idioma
    this.translateService.getLanguageChanged().subscribe((language) => {
      this.language = language;
      this.loadQuizQuestions(this.language);
    });
  }

  // Carregar as perguntas com base na linguagem
  private async loadQuizQuestions(language: string) {
    this.quizService
      .getQuizQuestions(language)
      .then((questions: any[]) => {
        this.questions = questions;
      })
      .catch((error) => {
        console.error('Erro ao carregar perguntas:', error);
      });
  }

  // Submeter o quiz e salvar a pontuação no banco
  public async submitQuizAwsers() {
    if (this.isFormValid()) {
      this.submitted = true;
      this.calculateQuizScore(this.questions);
    } else {
      this.submitted = false;
    }
  }

  private calculateQuizScore(questions: any[]): any {
    if (questions) {
      // Calcula escore do usuário
      return this.quizService
        .calculateQuestionsScore(this.questions)
        .then((result) => {
          //Salva o score no banco de dados e redireciona a página de resultados
          if (this.userId) {
            // Usuário logado
            this.saveUserScore(this.userId).then((result) => {
              this.router.navigate([`/result/${this.userId}`]);
            });
          } else {
            // Convidado
            // Envia o score para o componente de resultados
            this.results.emit(this.score);
          }
          return (this.score = result);
        });
    }
  }

  // Verifica se todas as perguntas da etapa atual foram respondidas
  public isFormValid(): boolean {
    const currentQuestions = this.getQuestionsForStep();
    return currentQuestions.every(
      (question: { response: null }) => question.response !== null
    );
  }

  // Avança para a próxima etapa
  public nextStep() {
    if (this.isFormValid() && this.currentStep < this.maxSteps) {
      this.currentStep++;
    }
  }

  // Volta para a etapa anterior
  public backStep() {
    this.currentStep--;
  }

  // Retorna as perguntas da etapa atual
  public getQuestionsForStep() {
    const stepSize = Math.ceil(this.questions.length / this.maxSteps);
    const startIndex = this.currentStep * stepSize;
    return this.questions.slice(startIndex, startIndex + stepSize);
  }

  // Verifica se uma pergunta é obrigatória
  public checkRequired(question: any) {
    return question.response !== null;
  }

  private async saveUserScore(id: string): Promise<any> {
    // Se logado, salva resultados no banco de dados
    if (id) {
      this.userService
        .saveUserScore(id, this.score)
        .then((result) => {
          console.log('Usuário logado: Pontuação salva com sucesso!');
          return result;
        })
        .catch((error) => {
          console.error('Usuário logado: Erro ao salvar pontuação: ', error);
          return error;
        });
    } else {
      console.error('Usuário deslogado.');
      return null;
    }
  }
}
