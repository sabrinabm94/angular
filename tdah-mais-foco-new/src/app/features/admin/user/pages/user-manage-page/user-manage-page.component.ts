import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserManageComponent } from '../../components/user-manage/user-manage.component';
import { TranslatePipe } from '../../../../../core/pipes/translate.pipe';
import { UserService } from '../../../../../core/services/user.service';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../../shared/components/header/header.component';

@Component({
  selector: 'app-user-manage-page',
  standalone: true,
  templateUrl: './user-manage-page.component.html',
  styleUrls: ['./user-manage-page.component.css'],
  imports: [
    UserManageComponent,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class UserManagePageComponent implements OnInit {
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
