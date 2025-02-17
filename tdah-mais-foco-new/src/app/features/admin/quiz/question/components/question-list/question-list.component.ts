import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { EducationLevel } from '../../../../../../data/models/enums/user/user-educationLevel.enum';
import { Gender } from '../../../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../../../data/models/enums/user/user-occupation.enum';
import { Role } from '../../../../../../data/models/enums/user/user-role.enum';
import { FirebaseUser } from '../../../../../../data/models/user/Firebase-user.interface';
import { UserToManageListItem } from '../../../../../../data/models/user/user-to-manage-list-item.interface';
import { ContainerComponent } from '../../../../../../shared/components/container/container.component';
import { ManageListComponent } from '../../../../../../shared/components/manage-list-component/manage-list.component';
import { QuizQuestionToManageListItem } from '../../../../../../data/models/quiz/quiz-question-to-manage-list-item.interface';
import { QuestionService } from '../../../../../../core/services/question.service';
import { QuizQuestion } from '../../../../../../data/models/quiz/quiz-question.interface';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
    ManageListComponent,
  ],
})
export class QuestionListComponent implements OnInit {
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

  questionsToManageList: QuizQuestionToManageListItem[] | null = [];

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getQuestionList(this.userAdmin);
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private async getQuestionList(
    userAdmin: FirebaseUser | null
  ): Promise<QuizQuestionToManageListItem[] | null> {
    if (userAdmin) {
      try {
        const questionsToManageList =
          await this.questionService.getAllQuestionsData(userAdmin);
        if (questionsToManageList) {
          // Filtrando valores nulos e garantindo que questionsToManageList seja do tipo QuizQuestionToManageListItem[]
          this.questionsToManageList = questionsToManageList.map((item) => ({
            id: item.id ? item.id : '',
            question: item.question,
            area: item.area,
            active: item.active,
          }));
          return this.questionsToManageList;
        }
      } catch (error) {
        const errorMessage = 'Erro ao obter listagem de perguntas';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
      }
    }
    return null;
  }

  public async editQuestion(question: QuizQuestion): Promise<boolean | null> {
    if (question && question.id) {
      return this.router.navigate([`/question-management/${question.id}`]);
    }
    return null;
  }

  public async registerQuestion(): Promise<boolean | null> {
    return this.router.navigate([`/register-question`]);
  }
}
