import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

/**
 * O componente `NotFoundPageComponent` representa a página de erro 404 (não encontrada),
 * exibida quando um usuário tenta acessar uma rota inexistente no aplicativo.
 * Este componente é autônomo (`standalone`) e utiliza componentes de cabeçalho e rodapé,
 * além do módulo de internacionalização Transloco.
 */
@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent {}
