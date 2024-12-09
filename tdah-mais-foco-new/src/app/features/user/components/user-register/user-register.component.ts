import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
import { Router } from '@angular/router';
import { EmailUtils } from '../../../../core/utils/email.utils';
import { TranslateService } from '../../../../core/services/translate.service';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    ButtonComponent,
    FieldsetComponent,
    ErrorMessageComponent,
    TranslatePipe,
  ],
})
export class UserRegisterComponent {
  user: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
  };

  submitted: boolean = false;

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
          .then(
            async (result: {
              user: {
                email: string | null;
                displayName: string | null;
                uid: any;
              };
            }) => {
              if (result) {
                // Faz o login automático após o registro
                let loggedUser: FirebaseUser = {
                  email: result.user.email ? result.user.email : '',
                  displayName: this.user ? this.user.displayName : '',
                  uid: result.user.uid,
                };
                this.user = this.userService.setUser(loggedUser);

                await this.userService
                  .saveUserData(loggedUser)
                  .then((response) => {
                    alert(this.translateService.translate('register_success'));
                    this.router.navigate(['/quiz']);
                  });
              }
            }
          )
          .catch((error: any) => {
            console.error('Erro ao registrar usuário:', error);
            alert(this.translateService.translate('invalid_data'));
          });
      }
    }
  }

  validEmail(email: string | null): boolean {
    if (email) {
      return this.emailUtils.validEmail(email);
    }
    return false;
  }

  public isFormValid(): boolean {
    if (this.user) {
      return (
        this.user.displayName?.trim() !== '' &&
        this.user.password?.trim() !== '' &&
        this.validEmail(this.user.email)
      );
    }
    return false;
  }

  private clearUserCredentials() {
    this.user = {
      displayName: '',
      email: '',
      password: '',
      uid: '',
    };
  }
}
