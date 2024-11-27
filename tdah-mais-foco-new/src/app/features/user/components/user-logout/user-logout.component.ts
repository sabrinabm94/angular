import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
  imports: [ButtonComponent, TranslatePipe],
})
export class UserLogoutComponent {
  constructor(private auth: Auth, private router: Router) {}

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
