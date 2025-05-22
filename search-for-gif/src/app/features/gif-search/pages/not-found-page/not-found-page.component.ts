import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * O componente `NotFoundPageComponent` representa a página de erro 404 (não encontrada),
 * exibida quando um usuário tenta acessar uma rota inexistente no aplicativo.
 */
@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent {}
