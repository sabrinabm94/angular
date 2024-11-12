import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
  imports: [ButtonComponent, TranslocoModule],
})
export class UserLogoutComponent {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
