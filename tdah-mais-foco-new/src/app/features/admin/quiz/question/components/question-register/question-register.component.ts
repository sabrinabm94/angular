import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input } from '@angular/core';
import { AlertMessageComponent } from '../../../../../../shared/components/alert-message/alert-message.component';
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

@Component({
  selector: 'app-question-register',
  standalone: true,
  templateUrl: './question-register.component.html',
  styleUrls: ['./question-register.component.css'],
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
    RouterModule,
    TranslateOrReturnKeyPipe,
  ],
})
export class QuestionRegisterComponent {
  @Input()
  userAdminId: string | null = null;

  public submitted: boolean = false;
  public questionAreaOptions: QuestionArea[] = [];

  public question: QuizQuestion = {
    question: '',
    example: '',
    frequency: '',
    context: '',
    area: [QuestionArea.none],
    result: false,
    active: false,
  };

  constructor(
    private translateService: TranslateService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private dateUtils: DateUtils
  ) {
    this.getFormOptions();
  }

  private getFormOptions() {
    this.questionAreaOptions = Object.values(QuestionArea);
  }

  public async registerQuestion(userAdminId: string | null): Promise<void> {
    this.submitted = true;
    const formData = this.question;

    if (this.question) {
      const question: QuizQuestion = {
        id: String(crypto.randomUUID()),
        question: String(formData.question),
        example: String(formData.example),
        frequency: String(formData.frequency),
        context: String(formData.context),
        area: formData.area,
        active: true,
        creationDate: this.dateUtils.formateDateToInternationFormatString(
          new Date()
        ),
        creatorId: String(userAdminId),
      };

      //Salva dados do usuário no banco de dados
      await this.questionService
        .save(question)
        .then(async (result: any) => {
          if (result) {
            // Faz o login automático após o registro e redirecionamento
            const errorMessage = this.translateService.translate(
              'question_creation_success'
            );
            this.alertService.alertMessageTriggerFunction(
              errorMessage,
              'success',
              true
            );
          }
        })
        .catch((error: any) => {
          const errorMessage = this.translateService.translate(
            'question_creation_error'
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
