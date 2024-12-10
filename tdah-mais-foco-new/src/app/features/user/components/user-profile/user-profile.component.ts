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
import { Component, OnInit } from '@angular/core';
import { FirebaseAuthUser } from '../../../../data/models/FirebaseAuthUser.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
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
export class UserProfileComponent implements OnInit {
  user: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '',
    ocupation: '',
    educationLevel: '',
  };

  submitted: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private emailUtils: EmailUtils,
    private translateService: TranslateService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const currentUser = this.userService.getUser();

    if (currentUser && currentUser.uid) {
      try {
        const userData = await this.getUserData(currentUser.uid);
        if (userData) {
          // Atualiza o formulário com os dados do usuário
          this.user = { ...this.user, ...userData };
          this.user.uid = currentUser.uid;

          console.log(this.user);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    }
  }

  public async getUserData(id: string): Promise<FirebaseUser | null> {
    try {
      let userData: FirebaseUser | null = await this.userService
        .getUserDataById(id)
        .then((result) => result);

      let currentUserData: FirebaseUser | null =
        this.authService.getCurrentFirebaseUser();

      if (userData && currentUserData) {
        let user = userData;
        user.email = currentUserData.email;
        //user.password = currentUserData.password;
        return user;
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }

  public async updateUserData(): Promise<void> {
    this.submitted = true;

    if (this.isFormValid()) {
      if (this.user && this.user.email && this.user.password) {
        console.log(this.user);
        // Atualiza no banco de dados
        await this.userService
          .updateUserData(this.user)
          .then(async (response) => {
            // Verifica se o e-mail foi alterado e atualiza no auth do Firebase
            const currentUser: FirebaseUser | null =
              this.authService.getCurrentFirebaseUser();
            if (
              this.user &&
              this.user.email &&
              currentUser?.email !== this.user.email
            ) {
              await this.authService.updateEmail(this.user.email).then();
            }

            // Verifica se a senha foi alterada e atualiza no auth do Firebase
            /* if (
              this.user &&
              this.user.password &&
              currentUser?.password !== this.user.password
            ) {
              await this.authService.updatePassword(this.user.password).then();
            } */

            alert(this.translateService.translate('update_success'));
          })
          .catch((error) => {
            console.error('Erro ao atualizar usuário: ', error);
          });
      }
    }
  }

  public validEmail(email: string | null): boolean {
    if (email) {
      return this.emailUtils.validEmail(email);
    }
    return false;
  }

  public isFormValid(): boolean {
    if (this.user) {
      return (
        this.user.displayName?.trim() !== '' &&
        //this.user.password?.trim() !== '' &&
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
