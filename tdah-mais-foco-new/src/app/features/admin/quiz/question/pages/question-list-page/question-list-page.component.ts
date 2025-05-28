import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../../../core/pipes/translate.pipe';
import { UserService } from '../../../../../../core/services/user.service';
import { RouterModule } from '@angular/router';
import { QuestionListComponent } from '../../components/question-list/question-list.component';

@Component({
  selector: 'app-question-list-page',
  standalone: true,
  templateUrl: './question-list-page.component.html',
  styleUrls: ['./question-list-page.component.css'],
  imports: [
    QuestionListComponent,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class QuestionListPageComponent implements OnInit {
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
