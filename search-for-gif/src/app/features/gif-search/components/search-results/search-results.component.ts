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
  public itemPerPage: number = 8;

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
    if (gifs) {
      this.gifs = gifs;
      this.currentPageNumber = 1; // Reseta a página para 1 quando os dados são atualizados
    }
  }

  /**
   * Retorna se foram encontrados resultados válidos ou não
   * @param {Gif[]} results - listagem de resultados de gifs encontrados
   * @returns {boolean}
   */
  public showResults(results: Gif[]): boolean {
    if (results && results.length > 0) {
      return true;
    }
    return false;
  }
}
