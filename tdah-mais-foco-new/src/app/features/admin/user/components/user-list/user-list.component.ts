import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { EducationLevel } from '../../../../../data/models/enums/user/user-educationLevel.enum';
import { Gender } from '../../../../../data/models/enums/user/user-gender.enum';
import { Occupation } from '../../../../../data/models/enums/user/user-occupation.enum';
import { Role } from '../../../../../data/models/enums/user/user-role.enum';
import { FirebaseUser } from '../../../../../data/models/user/Firebase-user.interface';
import { UserToManageListItem } from '../../../../../data/models/user/user-to-manage-list-item.interface';
import { ContainerComponent } from '../../../../../shared/components/container/container.component';
import { ManageListComponent } from '../../../../../shared/components/manage-list-component/manage-list.component';
import { AlertMessageComponent } from '../../../../../shared/components/alert-message/alert-message.component';
import { TranslateService } from '../../../../../core/services/translate.service';
import { AlertService } from '../../../../../core/services/alert.service';

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
    ManageListComponent,
    AlertMessageComponent,
  ],
})
export class UserListComponent implements OnInit {
  userAdmin: FirebaseUser | null = {
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

  usersToManageList: UserToManageListItem[] | null = [];
  genderOptions: Gender[] = [];
  occupationOptions: Occupation[] = [];
  educationLevelOptions: EducationLevel[] = [];
  submitted: boolean = false;
  roleOptions: Role[] = [];
  showDeleteUserPopup: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getUsersList(this.userAdmin);
  }

  private async getUser(): Promise<FirebaseUser | null> {
    const firebaseUser: FirebaseUser | null = this.userService.getUser();

    if (firebaseUser && firebaseUser.uid) {
      this.userAdmin = await this.userService.getUserDataById(firebaseUser.uid);
    }

    return this.userAdmin;
  }

  private async getUsersList(
    userAdmin: FirebaseUser | null
  ): Promise<UserToManageListItem[] | null> {
    if (userAdmin) {
      try {
        const usersToManageList = await this.userService.getAllUsersData(
          userAdmin
        );
        if (usersToManageList) {
          // Filtrando valores nulos e garantindo que usersToManageList seja do tipo UserToManageListItem[]
          this.usersToManageList = usersToManageList
            .map((user) => this.convertFirebaseUserToUserToManageListItem(user))
            .filter(
              (userToManage) => userToManage !== null
            ) as UserToManageListItem[];
          return this.usersToManageList;
        }
      } catch (error) {
        const errorMessage =
          this.translateService.translate('users_data_error');
        this.alertService.alertMessageTriggerFunction(
          errorMessage,
          'error',
          true
        );
      }
    }
    return null;
  }

  public async editUser(user: FirebaseUser): Promise<boolean | null> {
    if (user && user.uid) {
      return this.router.navigate([`/user-management/${user.uid}`]);
    }
    return null;
  }

  private convertFirebaseUserToUserToManageListItem(
    user: FirebaseUser
  ): UserToManageListItem | null {
    if (user) {
      const userToManage: UserToManageListItem = {
        uid: String(user.uid),
        birthdate: String(user.birthdate),
        email: String(user.email),
        name: String(user.displayName),
        role: String(user.role),
        active: String(user.active),
      };

      return userToManage;
    }
    return null;
  }
}
