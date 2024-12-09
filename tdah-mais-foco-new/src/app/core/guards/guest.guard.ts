import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    if (!this.userService.isUserLoaded()) {
      await this.userService.initializeUser();
    }

    const user = this.userService.getUser();
    if (!user) {
      console.log('Usuário não autenticado, permitindo acesso ao Guest.');
      return true;
    } else {
      console.log('Usuário autenticado, redirecionando para a Home.');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
