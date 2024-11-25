import { Component, Input } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FieldsetComponent } from '../../../../shared/components/fieldset/fieldset.component';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslateService } from '../../../../core/services/translate.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    TranslatePipe,
    ButtonComponent,
    FieldsetComponent,
  ],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: any;
  areasResults: any[] = [];
  results: any;
  language: string = '';

  constructor(
    private quizService: QuizService,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
    this.loadResults(this.language);

    // Inscrever-se para as mudanças de idioma
    this.translateService.getLanguageChanged().subscribe((language) => {
      this.language = language; // Atualiza a linguagem
      this.loadResults(this.language); // Recarrega as perguntas com o novo idioma
    });
  }

  async loadResults(language: string) {
    if (language) {
      try {
        const messagesByArea = await this.quizService.getResultsMessageByArea(
          language
        );
        this.areasResults = this.quizService.calculateResultsByArea(
          this.score,
          messagesByArea
        );

        const messages = await this.quizService.getResultsMessage(language);
        this.results = this.quizService.calculateResults(this.score, messages);
      } catch (error) {
        console.error('Error generating results:', error);
      }
    }
  }
}
