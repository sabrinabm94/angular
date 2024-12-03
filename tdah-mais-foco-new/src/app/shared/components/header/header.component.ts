import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SwitchLanguageNavComponent } from '../switch-language-nav/switch-language-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseUser } from '../../../data/models/user-firebase.interface';
import { UserService } from '../../../core/services/user.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, SwitchLanguageNavComponent, TranslatePipe],
})
export class HeaderComponent implements OnInit {
  loggedUser: FirebaseUser | null = null;
  @Input() userId: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (!this.userId) {
      this.getUser();
    }
  }

  private getUser(): string {
    this.loggedUser = this.userService.getUser();
    if (this.loggedUser) {
      this.userId = this.loggedUser.uid;
      console.warn('Usuário logado: ' + this.userId);
    } else {
      console.warn('Convidado.');
    }

    return this.userId;
  }

  logout() {
    this.authService.logout();
    this.loggedUser = null;
    this.userId = '';
    this.router.navigate([`/login`]);
  }
}
