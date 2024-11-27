import { Component } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { UserLoginComponent } from '../../components/user-login/user-login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    UserLoginComponent,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
  ],
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {}

  async login(email: string, password: string) {
    try {
      const user = await this.authService
        .login(email, password)
        .then((data) => data);
      console.log('Usuário logado:', user);
    } catch (error) {
      console.error('Erro ao logar:', error);
    }
  }
}
