import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserloginComponent } from '../../components/user-login/user-login.component';
import { UserRegistrationComponent } from '../../components/user-registration/user-registration.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [UserloginComponent, UserRegistrationComponent],
})
export class LoginPageComponent {}
