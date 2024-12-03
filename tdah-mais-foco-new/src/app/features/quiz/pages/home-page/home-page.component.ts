import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/user-firebase.interface';
import { LanguageService } from '../../../../core/services/language.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ResultsComponent } from '../../components/results/results.component';
import { QuizComponent } from '../../components/quiz/quiz.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ResultsComponent,
    QuizComponent,
    TranslatePipe,
  ],
})
export class HomePageComponent implements OnInit {
  public language: string = '';
  private loggedUser: FirebaseUser | null = null;
  public userId: string = '';
  public results: any = null;

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getCurrentLanguage();
    this.getLoggedUser();
  }

  private getLoggedUser() {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.loggedUser = user;
        this.userId = user.uid;
        console.warn('Usuário logado: ' + this.userId);
      } else {
        console.warn('Convidado');
      }
    });
  }

  private getCurrentLanguage() {
    this.language = this.languageService.getLanguage();
  }
}
