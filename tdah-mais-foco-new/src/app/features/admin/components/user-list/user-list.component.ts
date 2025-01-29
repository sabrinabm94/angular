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
import { Gender } from '../../../../data/models/enums/gender.enum';
import { Occupation } from '../../../../data/models/enums/occupation.enum';
import { EducationLevel } from '../../../../data/models/enums/educationLevel.enum';
import { Role } from '../../../../data/models/enums/role.enum';
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

  usersToManageList: FirebaseUser[] | null = [];
  genderOptions: Gender[] = [];
  occupationOptions: Occupation[] = [];
  educationLevelOptions: EducationLevel[] = [];
  submitted: boolean = false;
  roleOptions: Role[] = [];
  showDeleteUserPopup: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

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
  ): Promise<FirebaseUser[] | null> {
    if (userAdmin) {
      try {
        const usersToManageList = await this.userService.getAllUsersData(
          userAdmin
        );
        if (usersToManageList) console.log(usersToManageList);
        return (this.usersToManageList = usersToManageList);
      } catch (error) {
        const errorMessage = 'Erro ao obter usuários';
        console.error(errorMessage, error);
        throw new Error(errorMessage + error);
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
}
