import { Component, OnInit, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateService } from './core/services/translate.service';
import { UserService } from './core/services/user.service';
import { AlertMessageComponent } from './shared/components/alert-message/alert-message.component';
import { AlertService } from './core/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AlertMessageComponent,
  ],
  providers: [TranslateService],
})
export class AppComponent implements OnInit {
  public loading = true;
  private userService!: UserService;
  public alertMessageTrigger: boolean = false;
  public alertMessageType: string = 'error';
  public alertMessage: string = 'Erro, tente novamente';
  private subscriptions = new Subscription();

  constructor(
    private translateService: TranslateService,
    private injector: Injector,
    private alertService: AlertService
  ) {}

  async ngOnInit(): Promise<void> {
    this.translate();
    this.userService = this.injector.get(UserService);
    await this.userService.getUser();
    this.loading = false;
    this.listenToAlerts();
  }

  private translate() {
    const languageId = environment.defaultLanguageId;

    const language = this.translateService.getLanguageById(languageId);
    if (language) {
      this.translateService.setActiveLanguage(language);
    }
  }

  private listenToAlerts() {
    this.subscriptions.add(
      this.alertService.alertMessageTrigger$.subscribe((trigger) => {
        this.alertMessageTrigger = trigger;
      })
    );

    this.subscriptions.add(
      this.alertService.alertMessageType$.subscribe((type) => {
        this.alertMessageType = type;
      })
    );

    this.subscriptions.add(
      this.alertService.alertMessage$.subscribe((message) => {
        this.alertMessage = message;
      })
    );
  }

  public alertMessageEmmited() {
    this.alertService.alertMessageEmmited();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
