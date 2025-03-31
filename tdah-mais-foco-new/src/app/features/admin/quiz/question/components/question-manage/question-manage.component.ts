import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../../../core/services/translate.service';
import { UserService } from '../../../../../../core/services/user.service';
import { DateUtils } from '../../../../../../core/utils/date.utils';
import { EmailUtils } from '../../../../../../core/utils/email.utils';
import { FirebaseUser } from '../../../../../../data/models/user/Firebase-user.interface';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { AlertMessageComponent } from '../../../../../../shared/components/alert-message/alert-message.component';
import { FieldsetComponent } from '../../../../../../shared/components/fieldset/fieldset.component';
import { AlertService } from '../../../../../../core/services/alert.service';
import { TranslateOrReturnKeyPipe } from '../../../../../../core/pipes/translateOrReturnKey.pipe';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';
import { QuestionArea } from '../../../../../../data/models/enums/question/question-area.enum';
import { QuestionService } from '../../../../../../core/services/question.service';

@Component({
  selector: 'app-question-manage',
  standalone: true,
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    AlertMessageComponent,
    TranslatePipe,
    TranslateOrReturnKeyPipe,
    MatOptionModule,
  ],
})
export class QuestionManageComponent implements OnInit {
  @Input()
  userAdminId: string | null = null;

  public submitted: boolean = false;
  public questionAreaOptions: QuestionArea[] = [];

  public questionToManage: QuizQuestion = {
    question: '',
    example: '',
    frequency: '',
    context: '',
    area: [QuestionArea.none],
    result: false,
    active: false,
  };

  constructor(
    private emailUtils: EmailUtils,
    private dateUtils: DateUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private questionService: QuestionService
  ) {
    this.getFormOptions();
  }

  async ngOnInit(): Promise<void> {
    await this.getQuestionToManageById();
  }

  private getFormOptions() {
    this.questionAreaOptions = Object.values(QuestionArea);
  }

  private getIdFromUrl() {
    return this.route.snapshot.paramMap.get('id') || null;
  }

  private async getQuestionToManageById(): Promise<QuizQuestion | null> {
    const questionToManageId = this.getIdFromUrl();

    if (questionToManageId) {
      const questionToManage = await this.getQuestionById(questionToManageId);

      return questionToManage ? questionToManage : null;
    }

    return null;
  }

  public async getQuestionById(id: string): Promise<QuizQuestion | null> {
    try {
      const questionData: QuizQuestion | null = await this.questionService
        .getById(id)
        .then((result) => result);

      if (questionData) {
        return questionData;
      }
    } catch (error) {
      const errorMessage = this.translateService.translate(
        'questions_data_error'
      );
      this.alertService.alertMessageTriggerFunction(
        errorMessage,
        'error',
        true
      );
    }
    return null;
  }

  public async updateQuestion(
    questionToManage: QuizQuestion | null,
    userAdminId: string | null
  ): Promise<FirebaseUser | null> {
    if (questionToManage && userAdminId) {
      this.submitted = true;
      if (userAdminId && questionToManage) {
        const questionToManageNewData: QuizQuestion = {
          id: questionToManage.id,
          question: questionToManage.question,
          example: questionToManage.example,
          frequency: questionToManage.frequency,
          context: questionToManage.context,
          area: questionToManage.area,
          active: questionToManage.active,
          updateDate: this.dateUtils.formateDateToInternationFormatString(
            new Date()
          ),
          updaterId: String(userAdminId),
        };

        if (questionToManageNewData) {
          await this.questionService
            .update(questionToManageNewData)
            .then(async (result) => {
              if (result) {
                const errorMessage = this.translateService.translate(
                  'question_update_success'
                );
                this.alertService.alertMessageTriggerFunction(
                  errorMessage,
                  'success',
                  true
                );
                return result;
              }
              return null;
            })
            .catch((error) => {
              const errorMessage = this.translateService.translate(
                'question_update_error'
              );
              this.alertService.alertMessageTriggerFunction(
                errorMessage,
                'error',
                true
              );
            });
        }
      }
    }
    return null;
  }
}
