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
  result: any;
  shareUrl: string = '';
  resultId: string | null = null;
  results: any;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.getResultId();
    this.updateMetaTags();
  }

  getResultId(): void {
    this.route.paramMap.subscribe((params) => {
      this.resultId = params.get('id');
      if (this.resultId) {
        this.results = this.recoverResults(this.resultId); // Chama recoverResults somente quando resultId for obtido
      }
    });
  }

  async recoverResults(resultId: string) {
    try {
      if (resultId) {
        this.shareUrl = `${window.location.origin}/results/${resultId}`;
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
          text: `Eu acabei de fazer o quiz e meu resultado é: ${this.result.name}`, // Customize com o texto dos resultados
          url: this.shareUrl,
        })
        .then(() => {
          console.log('Compartilhado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao compartilhar:', error);
        });
    }
  }

  // Compartilhamento por rede social
  shareOnWhatsApp() {
    const message = `Eu acabei de fazer o quiz e meu resultado é: ${this.result?.name}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message + ' - ' + this.shareUrl
    )}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnInstagram() {
    const instagramUrl = `https://www.instagram.com`;
    window.open(instagramUrl, '_blank');
  }

  shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.shareUrl
    )}`;
    window.open(facebookUrl, '_blank');
  }

  shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Eu acabei de fazer o quiz e meu resultado é: ${this.result.name}`
    )}&url=${encodeURIComponent(this.shareUrl)}`;
    window.open(twitterUrl, '_blank');
  }

  updateMetaTags() {
    const resultUrl = `${window.location.origin}/results/${this.resultId}`;
    const description = `Confira meu resultado: ${this.result.name}!`;
    const imageUrl = this.result.image;

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
