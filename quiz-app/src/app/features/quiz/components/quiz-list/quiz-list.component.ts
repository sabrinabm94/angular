import { Component, Output, EventEmitter, Input } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/user/Firebase-user.interface';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { Occupation } from '../../../../data/models/enums/user/user-occupation.enum';
import { Gender } from '../../../../data/models/enums/user/user-gender.enum';
import { EducationLevel } from '../../../../data/models/enums/user/user-educationLevel.enum';
import { Role } from '../../../../data/models/enums/user/user-role.enum';
import { Quiz } from '../../../../data/models/quiz/quiz.interface';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ContainerComponent, TranslatePipe],
})
export class QuizListComponent {
  public quizList: Quiz[] | null = [];
  public quizId: number | null = null;

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

  @Input() userId: string | null = '';
  @Input() currentLanguageId: number | null = null;

  constructor(
    private quizService: QuizService,
    private translateService: TranslateService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAllQuiz();
  }

  private async getAllQuiz() {
    if (this.userAdmin) {
      await this.quizService
        .getAll(this.userAdmin)
        .then((result) => (this.quizList = result));
    }
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }
}
