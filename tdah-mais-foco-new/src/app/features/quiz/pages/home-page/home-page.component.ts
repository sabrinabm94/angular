import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ResultsComponent } from '../../components/results/results.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { TranslateService } from '../../../../core/services/translate.service';
import { QuizComponent } from '../../components/quiz/quiz.component';

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
  public languageName: string = '';
  public userId: string | null = null;
  public results: any = null;

  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
  }

  private getUser(): string | null {
    const user = this.userService.getUser();
    return (this.userId = user ? user.uid : null);
  }

  private getLanguage(): string | null {
    const language = this.translateService.getLanguage();
    return (this.languageName = language);
  }
}
