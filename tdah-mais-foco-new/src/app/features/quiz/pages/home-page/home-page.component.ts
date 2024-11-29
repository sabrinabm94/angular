import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { QuizComponent } from '../../components/quiz/quiz.component';
import { ResultsComponent } from '../../components/results/results.component';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';
import { UserService } from '../../../../core/services/user.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslatePipe,
    QuizComponent,
    ResultsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  results: any = null;
  public language: string = '';
  private loggedUser: FirebaseUser | null = null;
  public userId: string = '';

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getCurrentLanguage();
    this.getLoggedUser();
  }

  private getLoggedUser() {
    this.loggedUser = this.userService.getUser();
    if (this.loggedUser) {
      this.userId = this.loggedUser.uid;
    } else {
      console.warn('Convidado.');
    }

    return this.userId;
  }

  private getCurrentLanguage() {
    return (this.language = this.languageService.getLanguage());
  }
}
