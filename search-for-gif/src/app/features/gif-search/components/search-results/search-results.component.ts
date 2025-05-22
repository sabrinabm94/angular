import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  Input,
} from '@angular/core';
import { PictureComponent } from '../../../../shared/components/picture/picture.component';
import { Gif } from '../../../../data/interfaces/gif.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoModule } from '@ngneat/transloco';

/**
 * O componente `SearchResultsComponent` é responsável por exibir os resultados da busca de GIFs.
 * Ele utiliza paginação para organizar a exibição dos GIFs e permite que o usuário navegue entre diferentes páginas de resultados.
 */
@Component({
  selector: 'app-results-template',
  standalone: true,
  imports: [
    PictureComponent,
    CommonModule,
    NgxPaginationModule,
    TranslocoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  @HostBinding('class') class: string = 'app-results-template';
  @Input() gifs: Gif[] = [];
  public currentPageNumber: number = 1;
  public readonly ITENS_PER_PAGE: number = 8;

  /**
   * Função chamada quando o número da página é alterado.
   * Atualiza a página atual para o valor fornecido pelo evento de mudança de página.
   * @param {number} newPageNumber número da nova página.
   * @returns {number} página atual com valor atualizado.
   */
  handlePageChange(newPageNumber: number): number {
    return (this.currentPageNumber = newPageNumber);
  }

  /**
   * Atualiza a listagem de gifs exibida e atualiza a página atual para 1.
   * @param {Gif[]} gifs listagem de resultados de gifs.
   * @returns {Gif[]} retorna a listagem de gifs atualizada
   */
  public setData(gifs: Gif[]): Gif[] {
    if (gifs) {
      this.currentPageNumber = 1; // Reseta a página para 1 quando os dados são atualizados
      return (this.gifs = gifs);
    }
  }

  /**
   * Indica se deverá ser apresentada a listagem de gifs de acordo com a validade de seus itens
   * @param {Gif[]} results listagem de resultados de gifs encontrados
   * @returns {boolean} indicador de apresentação da listagem atualizado
   */
  public showResults(results: Gif[]): boolean {
    if (results && results.length > 0) {
      return true;
    }
    return false;
  }
}
