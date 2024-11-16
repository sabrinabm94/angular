import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { UserloginComponent } from '../../components/user-login/user-login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {}
