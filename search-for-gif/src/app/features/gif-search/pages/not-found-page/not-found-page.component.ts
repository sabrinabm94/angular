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
  selector: 'app-not-found-page', // Seletor utilizado para incluir o componente na aplicação
  standalone: true, // Define o componente como autônomo, sem a necessidade de um módulo pai
  imports: [
    HeaderComponent, // Componente de cabeçalho reutilizável
    FooterComponent, // Componente de rodapé reutilizável
    TranslocoModule, // Módulo de internacionalização para suporte a múltiplos idiomas
  ],
  templateUrl: './not-found-page.component.html', // Caminho do template HTML da página de erro 404
  styleUrls: ['./not-found-page.component.css'], // Caminho do arquivo de estilos CSS da página de erro 404
})
export class NotFoundPageComponent {
  // Este componente não contém nenhuma lógica no momento, sendo utilizado para exibir uma mensagem de página não encontrada.
}
