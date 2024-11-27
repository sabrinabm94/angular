import { Component, Input } from '@angular/core';
import { QuizService } from '../../../../core/services/quiz.service';
import { ContainerComponent } from '../../../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ResultsComponent } from '../../components/results/results.component';

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
  @Input() score: any;
  areasResults: any[] = [];
  results: any;
  resultShareUrl: string = '';
  userId: string = '';

  private message: string = `Olá, eu acabei de fazer meu teste de TDAH, faça você também !`;

  constructor(private route: ActivatedRoute, private meta: Meta) {}

  ngOnInit() {
    this.getUserId();
    this.updateMetaTags();
  }

  getUserId(): void {
    this.route.paramMap.subscribe((params) => {
      let paramsValue = params.get('id');
      this.userId = paramsValue ? paramsValue : '';
      if (this.userId) {
        this.results = this.recoverResults(this.userId);
      }
    });
  }

  async recoverResults(id: string) {
    try {
      if (id) {
        this.resultShareUrl = `${window.location.origin}/result/${id}`;
      }
    } catch (error) {
      console.error('Error recovering results:', error);
    }
  }

  // Função para compartilhar os resultados via Share API
  shareResults() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Confira meus resultados!',
          text: this.message,
          url: this.resultShareUrl,
        })
        .then(() => {
          console.log('Compartilhado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao compartilhar:', error);
        });
    }
  }

  updateMetaTags() {
    const resultUrl = `${window.location.origin}/results/${this.userId}`;
    const description = `Confira meu resultado: ${this.results.name}!`;
    const imageUrl = this.results.image;

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
