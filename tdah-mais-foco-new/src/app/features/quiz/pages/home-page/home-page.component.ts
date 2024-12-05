import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';
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
  public languageName: string | null = null;
  public userId: string | null = null;
  public results: any = null;

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
  }

  private getUser(): string | null {
    const user = this.userService.getUser();
    console.log('this.userId ', this.userId);
    return (this.userId = user ? user.uid : null);
  }

  private getLanguage(): string | null {
    const language = this.languageService.getLanguage();
    return (this.languageName = language ? language : null);
  }
}
