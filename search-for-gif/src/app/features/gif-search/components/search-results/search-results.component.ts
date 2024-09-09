import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  Input,
} from '@angular/core';
import { PictureComponent } from '../../../../shared/components/picture/picture.component';
import { Gif } from '../../../../data/models/gif.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * O componente `SearchResultsComponent` é responsável por exibir os resultados da busca de GIFs.
 * Ele utiliza paginação para organizar a exibição dos GIFs e permite que o usuário navegue entre diferentes páginas de resultados.
 */
@Component({
  selector: 'app-results-template', // Seletor usado para incluir o componente no template pai
  standalone: true,
  imports: [
    PictureComponent, // Componente de imagem para exibir as prévias dos GIFs
    CommonModule, // Módulo Angular comum necessário para várias funcionalidades
    NgxPaginationModule, // Módulo de paginação de terceiros
    TranslocoModule, // Módulo de internacionalização para tradução de textos
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite o uso de elementos customizados de terceiros como o módulo de paginação
  templateUrl: './search-results.component.html', // Localização do arquivo de template HTML
  styleUrls: ['./search-results.component.css'], // Localização dos arquivos de estilo CSS
})
export class SearchResultsComponent {
  /** Classe CSS atribuída ao host do componente para estilização */
  @HostBinding('class') class: string = 'app-results-template';

  /** Array de GIFs recebidos como entrada do componente pai */
  @Input() gifs: Gif[] = [];

  /** Número da página atual na paginação dos resultados */
  currentPageNumber: number = 1;

  /**
   * Função chamada quando o número da página é alterado.
   * Atualiza a página atual para o valor fornecido pelo evento de mudança de página.
   * @param {number} event - Número da nova página.
   * @returns {void}
   */
  handlePageChange(event: number): void {
    this.currentPageNumber = event;
  }

  /**
   * Atualiza os GIFs exibidos no componente e redefine a página atual para 1.
   * @param {Gif[]} gifs - Array de GIFs a ser exibido no componente.
   * @returns {void}
   */
  public setData(gifs: Gif[]): void {
    this.gifs = gifs;
    this.currentPageNumber = 1; // Resetar a página para 1 quando os dados são atualizados
  }
}
