import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [
    UserRegisterComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class RegisterPageComponent {}
