import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../../shared/components/header/header.component';
import { UserService } from '../../../../../core/services/user.service';
import { QuizListComponent } from '../../components/quiz-list/quiz-list.component';

@Component({
  selector: 'app-quiz-list-page',
  standalone: true,
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.css'],
  imports: [
    QuizListComponent,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class QuizListPageComponent implements OnInit {
  public userId: string | null = null;
  public isAdmin: boolean = false;

  constructor(private userService: UserService) {}

  async getUser(): Promise<string | null> {
    if (!this.userId) {
      const user = this.userService.getUser();
      if (user && user.uid) {
        this.isAdmin = await this.userService.isUserAdminById(user.uid);
        return (this.userId = user.uid);
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.getUser();
  }
}
