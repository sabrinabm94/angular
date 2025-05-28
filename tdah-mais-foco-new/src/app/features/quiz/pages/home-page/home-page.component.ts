import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ResultsComponent } from '../../components/results/results.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../core/services/translate.service';
import { QuizComponent, QuestionsListComponent } from '../../components/questions-list/questions-list.component';
import { QuizResultByArea } from '../../../../data/models/quiz/quiz-result-by-area.interface';
import { Language } from '../../../../data/models/language.interface';
import { QuizComponent_1 as QuizComponent, QuizListComponent } from '../../components/quiz-list/quiz-list.component';

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
    TranslatePipe,
    QuizListComponent,
    QuestionsListComponent
],
})
export class HomePageComponent implements OnInit {
  public languageId: number = 0;
  public userId: string | null = null;
  public results: QuizResultByArea | null = null;
  public isAdmin: boolean = false;
  public isFirstScore: boolean = false;

  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
  }

  async getUser(): Promise<string | null> {
    if (!this.userId) {
      // Evitar chamada duplicada
      const user = this.userService.getUser();
      if (user && user.uid) {
        this.isAdmin = await this.userService.isUserAdminById(user.uid);
        const userScore = await this.userService.getUserScore(user.uid);
        if (!userScore) {
          this.isFirstScore = true;
        }
        return (this.userId = user.uid);
      }
    }
    return null;
  }

  private getLanguage(): number | null {
    const language: Language | null = this.translateService.getActiveLanguage();
    if (language) {
      return (this.languageId = language.id);
    }
    return null;
  }
}
