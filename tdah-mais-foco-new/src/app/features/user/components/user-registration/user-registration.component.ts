import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Auth,
  createUserWithEmailAndPassword,
  IdTokenResult,
} from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslateService } from '../../../../core/services/translate.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    ErrorMessageComponent,
    FieldsetComponent,
    TranslatePipe,
    ButtonComponent,
  ],
})
export class UserRegistrationComponent {
  user: FirebaseUser | null = {
    uid: '',
    email: '',
    password: null,
  };
  submitted = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  public async registerUser(): Promise<void> {
    this.submitted = true;

    if (this.isFormValid()) {
      if (this.user && this.user.email && this.user.password) {
        await createUserWithEmailAndPassword(
          this.auth,
          this.user.email,
          this.user.password
        )
          .then((result) => {
            if (result) {
              alert(this.translateService.translate('register_success'));
              //Faz o login automático após o registro
              const loggedUser: FirebaseUser = {
                email: result.user.email ? result.user.email : '',
                displayName: result.user.displayName
                  ? result.user.displayName
                  : '',
                uid: result.user.uid,
              };
              this.user = this.userService.setUser(loggedUser);
              this.router.navigate(['/quiz']);
            }
          })
          .catch((error) => {
            console.error('Erro ao registrar usuário:', error);
            alert(this.translateService.translate('invalid_data'));
            /*
            alert(this.translateService.translate('invalid_password'));
            alert(this.translateService.translate('invalid_email_in_use'));
            */
          });
      }
    }
  }

  public validEmail(email: string): boolean {
    return this.emailUtils.validEmail(email);
  }

  public isFormValid(): boolean {
    if (
      this.user &&
      this.user.displayName &&
      this.user.email &&
      this.user.password
    ) {
      return (
        this.user.displayName.trim() !== '' &&
        this.user.email.trim() !== '' &&
        this.user.password.trim() !== '' &&
        this.validEmail(this.user.email)
      );
    } else {
      return false;
    }
  }
}
