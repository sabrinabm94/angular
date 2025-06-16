import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { FooterComponent } from '../../../../../../shared/components/footer/footer.component';
import { QuestionRegisterComponent } from '../../components/question-register/question-register.component';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-question-register-page',
  standalone: true,
  templateUrl: './question-register-page.component.html',
  styleUrls: ['./question-register-page.component.css'],
  imports: [
    QuestionRegisterComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class QuestionRegisterPageComponent {
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
