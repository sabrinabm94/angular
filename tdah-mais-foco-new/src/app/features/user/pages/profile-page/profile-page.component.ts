import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { UserService } from '../../../../core/services/user.service';

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
  ],
})
export class ProfilePageComponent implements OnInit {
  public userId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let user = this.userService.getUser();

    if (user) {
      this.userId = user.uid;
    }
  }
}
