import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { UserService } from '../../../../core/services/user.service';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  imports: [
    UserProfileComponent,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
})
export class ProfilePageComponent implements OnInit {
  public userId: string | null = null;
  public isAdmin: boolean = false;

  constructor(private userService: UserService) {}

  async getUser(): Promise<string | null> {
    if (!this.userId) {
      // Evitar chamada duplicada
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
