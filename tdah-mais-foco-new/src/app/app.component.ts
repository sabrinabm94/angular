import { Component, OnInit, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateService } from './core/services/translate.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [TranslateService],
})
export class AppComponent implements OnInit {
  loading = true;

  private userService!: UserService;

  constructor(
    private translateService: TranslateService,
    private injector: Injector
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtenha o serviço UserService manualmente usando o Injector
    this.userService = this.injector.get(UserService);

    // Use o serviço normalmente
    this.translateService.setLanguage(environment.lang);

    await this.userService.getUser();
    this.loading = false;
  }
}
