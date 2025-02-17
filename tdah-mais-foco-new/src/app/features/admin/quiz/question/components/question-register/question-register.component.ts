import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ErrorMessageComponent } from '../../../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../../../core/services/translate.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { FieldsetComponent } from '../../../../../../shared/components/fieldset/fieldset.component';
import { QuestionArea } from '../../../../../../data/models/enums/question/question-area.enum';
import { QuestionService } from '../../../../../../core/services/question.service';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';

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
    ErrorMessageComponent,
    TranslatePipe,
    RouterModule,
  ],
})
export class QuestionRegisterComponent {
  public submitted: boolean = false;
  public questionAreaOptions: QuestionArea[] = [];

  public question: QuizQuestion = {
    question: '',
    example: '',
    frequency_and_context: '',
    area: QuestionArea.none,
    result: false,
    active: false,
  };

  constructor(
    private translateService: TranslateService,
    private questionService: QuestionService
  ) {
    this.getFormOptions();
  }

  private getFormOptions() {
    this.questionAreaOptions = Object.values(QuestionArea);
  }

  public async registerQuestion(): Promise<void> {
    this.submitted = true;
    const formData = this.question;

    if (this.question) {
      const question: QuizQuestion = {
        question: String(formData.question),
        example: String(formData.example),
        frequency_and_context: String(formData.frequency_and_context),
        area: formData.area,
        result: Boolean(formData.result),
        active: true,
      };

      //Salva dados do usuário no banco de dados
      await this.questionService
        .saveQuestionData(question)
        .then(async (result: any) => {
          if (result) {
            // Faz o login automático após o registro e redirecionamento
            alert(this.translateService.translate('register_success'));
          }
        })
        .catch((error: any) => {
          console.error('Erro ao salvar dados de pergunta:', error);
          alert(this.translateService.translate('invalid_data'));
        });
    }
  }
}
