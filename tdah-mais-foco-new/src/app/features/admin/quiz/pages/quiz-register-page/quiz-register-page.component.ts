import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { HeaderComponent } from '../../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { UserService } from '../../../../../core/services/user.service';
import { QuizRegisterComponent } from '../../components/quiz-register/quiz-register.component';

@Component({
  selector: 'app-quiz-register-page',
  standalone: true,
  templateUrl: './quiz-register-page.component.html',
  styleUrls: ['./quiz-register-page.component.css'],
  imports: [
    QuizRegisterComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class QuizRegisterPageComponent {
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
