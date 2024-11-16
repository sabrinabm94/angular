import { Component } from '@angular/core';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FirebaseAppModule } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
  imports: [
    ButtonComponent,
    TranslocoModule,
    FirebaseAppModule,
    BrowserModule,
    AngularFireAuthModule,
  ],
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
