import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const isAdmin = await this.isAdmin();
    if (isAdmin && isAdmin === true) {
      return true;
    } else {
      this.router.navigate([`/not-found`]); // Página de acesso negado
      return false;
    }
  }

  async isAdmin(): Promise<boolean> {
    const user = this.userService.getUser();
    if (user && user.uid) {
      const isAdmin = await this.userService.isUserAdminById(user.uid);
      return isAdmin;
    }
    return false;
  }
}
