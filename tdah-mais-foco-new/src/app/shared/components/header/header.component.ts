import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SwitchLanguageNavComponent } from '../switch-language-nav/switch-language-nav.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FirebaseUser } from '../../../data/models/FirebaseUser.interface';
import { UserService } from '../../../core/services/user.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    SwitchLanguageNavComponent,
    TranslatePipe,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() userId: string | null = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit() {}

  logout() {
    this.authService.logout();
    this.userService.setUser(null);
    this.userId = '';
    this.router.navigate([`/login`]);
  }
}
