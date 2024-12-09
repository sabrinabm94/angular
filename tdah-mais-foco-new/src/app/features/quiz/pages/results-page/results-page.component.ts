import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ResultsComponent } from '../../components/results/results.component';
import { UserService } from '../../../../core/services/user.service';
import { LanguageService } from '../../../../core/services/language.service';
import { FirebaseUser } from '../../../../data/models/FirebaseUser.interface';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    ButtonComponent,
    FooterComponent,
    HeaderComponent,
    ResultsComponent,
  ],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css'],
})
export class ResultsPageComponent {
  public languageName: string | null = null;
  public userId: string | null = null;
  public results: any;

  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.getLanguage();
    this.getUser();
    this.updateMetaTags();
  }

  private getUser(): string | null {
    const user = this.userService.getUser();
    return (this.userId = user ? user.uid : null);
  }

  private getLanguage(): string | null {
    const language = this.languageService.getLanguage();
    return (this.languageName = language ? language : null);
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
