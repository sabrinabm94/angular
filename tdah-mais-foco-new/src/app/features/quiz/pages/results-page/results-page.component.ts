import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ResultsComponent } from '../../components/results/results.component';
import { UserService } from '../../../../core/services/user.service';
import { TranslateService } from '../../../../core/services/translate.service';
import { QuizResultByArea } from '../../../../data/models/quiz/quiz-result-by-area.interface';
import { Language } from '../../../../data/models/language.interface';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    FooterComponent,
    HeaderComponent,
    ResultsComponent,
  ],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css'],
})
export class ResultsPageComponent {
  public languageId: number = 0;
  public userId: string | null = null;
  public results: QuizResultByArea | null = null;
  public isAdmin: boolean = false;
  public showResults: boolean = false;

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
    this.updateMetaTags();
  }

  async getUser(): Promise<string | null> {
    if (!this.userId) {
      // Evitar chamada duplicada
      const user = this.userService.getUser();
      if (user && user.uid) {
        this.isAdmin = await this.userService.isUserAdminById(user.uid);
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

  private updateMetaTags() {
    const resultUrl = `${window.location.origin}/results/${this.userId}`;
    const description = '';
    const imageUrl = '';

    // Atualizar título
    this.meta.updateTag({ name: 'title', content: 'Meu Resultado do Quiz' });

    // Atualizar metatags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Meu Resultado do Quiz',
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: resultUrl });
  }
}
