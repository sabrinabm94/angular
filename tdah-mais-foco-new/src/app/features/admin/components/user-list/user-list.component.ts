import { FirebaseUser } from '../../../../data/models/Firebase-user.interface';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';
import { Role } from '../../../../data/models/enums/role.enum';
import { ButtonComponent } from '../../../../shared/components/pop-up/pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ContainerComponent,
    TranslatePipe,
    ButtonComponent,
  ],
})
export class UserListComponent implements OnInit {
  user: FirebaseUser | null = {
    displayName: '',
    email: '',
    password: '',
    uid: '',
    birthdate: '2000-01-01',
    ocupation: Occupation.student,
    gender: Gender.male,
    educationLevel: EducationLevel.high_school,
    role: Role.user,
    active: true,
    creationDate: '',
    updateDate: null,
    creatorId: '',
    updaterId: null,
  };

  usersList: FirebaseUser[] | null = [];
  genderOptions: Gender[] = [];
  occupationOptions: Occupation[] = [];
  educationLevelOptions: EducationLevel[] = [];
  submitted: boolean = false;
  roleOptions: Role[] = [];
  showDeleteUserPopup: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getUsersList(this.user);
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.user = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.user;
  }

  private async getUsersList(
    currentUser: FirebaseUser | null
  ): Promise<FirebaseUser[] | null> {
    if (currentUser) {
      try {
        const usersList = await this.userService.getAllUsersData(currentUser);
        if (usersList) return (this.usersList = usersList);
      } catch (error) {
        console.error('Erro ao carregar lista de usuários:', error);
      }
    }
    return null;
  }

  public async getUserDataById(id: string): Promise<FirebaseUser | null> {
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
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
    return null;
  }

  public deleteUserPopUp(showPopup: boolean) {
    this.showDeleteUserPopup = showPopup;
  }

  public async editUser(user: FirebaseUser): Promise<boolean | null> {
    if (user && user.uid) {
      return this.router.navigate([`/user-management/${user.uid}`]);
    }
    return null;
  }

  public async deleteUser(user: FirebaseUser): Promise<FirebaseUser | null> {
    if (user) {
      return await this.userService
        .deleteUserData(user)
        .finally(() => (this.showDeleteUserPopup = false));
    }

    return null;
  }
}
