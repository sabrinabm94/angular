import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  @Input() score: Record<string, number>; // Recebe o score calculado do quiz
  results: any[] = [];

  ngOnInit() {
    this.generateResults();
  }

  generateResults() {
    for (const area in this.score) {
      const points = this.score[area];
      let level: string;
      let tips: string[];

      if (points >= 8) {
        level = 'Alto';
        tips = [
          'Tente técnicas de respiração e mindfulness para acalmar a mente.',
          'Estabeleça uma rotina diária para melhorar o foco.',
        ];
      } else if (points >= 4) {
        level = 'Moderado';
        tips = [
          'Considere listas de tarefas para organização.',
          'Evite multitarefas, concentrando-se em uma atividade de cada vez.',
        ];
      } else {
        level = 'Baixo';
        tips = [
          'Pratique atividades de atenção plena regularmente.',
          'Mantenha um ambiente de trabalho sem distrações.',
        ];
      }

      this.results.push({
        area,
        level,
        points,
        tips,
      });
    }
  }
}
