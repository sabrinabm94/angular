import { Component } from '@angular/core';
import { UserRegistrationComponent } from '../../components/user-registration/user-registration.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [
    UserRegistrationComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
  ],
})
export class RegisterPageComponent {}
