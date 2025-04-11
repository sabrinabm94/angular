import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../../../core/services/translate.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { FieldsetComponent } from '../../../../../../shared/components/fieldset/fieldset.component';
import { QuestionArea } from '../../../../../../data/models/enums/question/question-area.enum';
import { QuestionService } from '../../../../../../core/services/question.service';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';
import { TranslateOrReturnKeyPipe } from '../../../../../../core/pipes/translateOrReturnKey.pipe';
import { AlertService } from '../../../../../../core/services/alert.service';
import { DateUtils } from '../../../../../../core/utils/date.utils';
import { Quiz } from '../../../../../../data/models/quiz/quiz.interface';
import { QuizService } from '../../../../../../core/services/quiz.service';
import { Language } from '../../../../../../data/models/language.interface';
import { FirebaseUser } from '../../../../../../data/models/user/Firebase-user.interface';
import { UserService } from '../../../../../../core/services/user.service';
import { Occupation } from '../../../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../../../data/models/enums/user/user-gender.enum';
import { EducationLevel } from '../../../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../../../data/models/enums/user/user-role.enum';

@Component({
  selector: 'app-question-register',
  standalone: true,
  templateUrl: './question-register.component.html',
  styleUrls: ['./question-register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    TranslatePipe,
    RouterModule,
    TranslateOrReturnKeyPipe,
  ],
})
export class QuestionRegisterComponent {
  @Input()
  userAdminId: string | null = null;

  userAdmin: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '2000-01-01',
    ocupation: Occupation.student,
    gender: Gender.male,
    educationLevel: EducationLevel.high_school,
    role: Role.user,
    active: true,
    creationDate: '',
    updateDate: null,
    creatorId: '',
    updaterId: null,
  };

  public submitted: boolean = false;
  public questionAreaOptions: QuestionArea[] = [];

  public question: QuizQuestion = {
    questions: [
      {
        question: '',
        language: {
          name: '',
          initials: '',
        },
        example: '',
        frequency: '',
        context: '',
      },
    ],
    area: [QuestionArea.none],
    result: false,
    active: false,
  };

  public quizId: string = '';

  public quizToManage: Quiz = {
    id: '',
    name: '',
    questions: [],
    active: false,
  };

  public languages: Language[] = [];

  constructor(
    private translateService: TranslateService,
    private alertService: AlertService,
    private dateUtils: DateUtils,
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private userService: UserService
  ) {
    this.getUser();
    this.getFormOptions();
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private getFormOptions() {
    this.questionAreaOptions = Object.values(QuestionArea);
    this.languages = this.translateService.getLanguagesList();
  }

  private getIdFromUrl() {
    return this.route.snapshot.paramMap.get('id');
  }

  public async getQuizById(
    id: string,
    userAdmin: FirebaseUser
  ): Promise<Quiz | null> {
    try {
      const data: Quiz | null = await this.quizService
        .getById(id, userAdmin)
        .then((result) => result);

      if (data) {
        return data;
      }
    } catch (error) {
      const errorMessage = this.translateService.translate('quiz_data_error');
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async register(userAdminId: string | null): Promise<void> {
    this.submitted = true;
    const formData = this.question;

    if (formData) {
      const question: QuizQuestion = {
        id: String(crypto.randomUUID()),
        questions: formData.questions,
        area: formData.area,
        active: true,
        creationDate: this.dateUtils.formateDateToInternationFormatString(
          new Date()
        ),
        creatorId: String(userAdminId),
      };

      if (question && this.quizToManage) {
        //se haver lista de perguntas, adiciona ao fim dela a nova pergunta, se não haver a listagem, cria com o novo item.
        this.quizToManage.questions && this.quizToManage.questions.length > 0
          ? this.quizToManage.questions.push(question)
          : (this.quizToManage.questions = [question]);

        this.updateQuiz(
          this.quizToManage,
          userAdminId,
          this.quizToManage.questions
        );
      }
    }
  }

  private createQuizObject(
    userAdminId: string,
    quizToManage: Quiz,
    questions: QuizQuestion[]
  ) {
    const quizToManageNewData: Quiz = {
      id: quizToManage.id ? quizToManage.id : String(crypto.randomUUID()),
      name: String(quizToManage.name),
      questions: questions,
      active: quizToManage.active,
      updateDate: this.dateUtils.formateDateToInternationFormatString(
        new Date()
      ),
      updaterId: String(userAdminId),
    };

    return quizToManageNewData;
  }

  public async updateQuiz(
    quiz: Quiz | null,
    userAdminId: string | null,
    questions: QuizQuestion[]
  ): Promise<void> {
    const quizId = this.getIdFromUrl();

    if (quizId && this.userAdmin) {
      const quiz = await this.getQuizById(quizId, this.userAdmin);

      if (quiz && userAdminId) {
        this.submitted = true;
        const quizId = quiz.id;
        let newData = this.createQuizObject(userAdminId, quiz, questions);
        newData.id = quizId;

        if (newData) {
          await this.quizService
            .update(newData, this.userAdmin)
            .then(async (result) => {
              if (result) {
                const errorMessage = this.translateService.translate(
                  'quiz_update_success'
                );
                this.alertService.alertMessageTriggerFunction(
                  errorMessage,
                  'success',
                  true
                );
              }
              this.router.navigate([`/question-list/${quizId}`]);
            })
            .catch((error) => {
              if (error) {
                const errorMessage =
                  this.translateService.translate('quiz_update_error');
                this.alertService.alertMessageTriggerFunction(
                  errorMessage,
                  'error',
                  true
                );
              }
            });
        }
      }
    }
  }

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public onSelectionChange(event: Event, selectedArea: QuestionArea): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const defaultValue = 'none';

    if (isChecked) {
      // Remover o valor "none" caso esteja presente
      this.question.area = this.question.area.filter(
        (area) => area !== defaultValue
      );

      // Adicionar o valor selecionado
      this.question.area = [...this.question.area, selectedArea];
    } else {
      // Remover o valor desmarcado
      this.question.area = this.question.area.filter(
        (area) => area !== selectedArea
      );
    }
  }

  addQuestion() {
    this.question.questions.push({
      question: '',
      language: {
        name: '',
        initials: '',
      },
      example: '',
      frequency: '',
      context: '',
    });
  }

  removeQuestion(index: number) {
    this.question.questions.splice(index, 1);
  }

  public isFormAreaSelectedValid(): boolean {
    // Verifica se ao menos uma área foi selecionada
    const isAreaSelected =
      this.question.area.length > 0 &&
      !this.question.area.includes(QuestionArea.none);

    return isAreaSelected;
  }

  public isFormValid(): boolean {
    // Verifica se todas as perguntas possuem os campos obrigatórios preenchidos
    const areAllQuestionsValid = this.question.questions.every(
      (question) =>
        question.language &&
        question.language.name.trim() !== '' &&
        question.question.trim() !== '' &&
        question.frequency.trim() !== '' &&
        question.context.trim() !== ''
    );

    return areAllQuestionsValid;
  }
}
