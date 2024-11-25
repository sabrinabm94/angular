import { Component } from '@angular/core';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
  imports: [
    ButtonComponent,
    FirebaseAppModule,
    AngularFireAuthModule,
    TranslatePipe,
  ],
})
export class UserLogoutComponent {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
