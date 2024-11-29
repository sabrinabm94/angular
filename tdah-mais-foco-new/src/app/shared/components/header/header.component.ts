import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '@angular/fire/auth';
import { SwitchLanguageNavComponent } from '../switch-language-nav/switch-language-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, SwitchLanguageNavComponent],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate([`/login`]);
  }
}
