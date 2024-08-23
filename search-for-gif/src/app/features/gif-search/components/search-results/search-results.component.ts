import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Input } from '@angular/core';
import { PictureComponent } from "../../../../shared/components/picture/picture.component";
import { Gif } from '../../../../data/models/gif.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-results-template',
  standalone: true,
  imports: [PictureComponent, CommonModule, NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // para permitir o uso do componente de paginação de terceiros
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  @HostBinding('class') class: string = "app-results-template";

  @Input() gifs: Gif[] = [];

  currentPageNumber: number = 1; // Página inicial

  handlePageChange(event: number) {
    this.currentPageNumber = event;
  }

  public setData(gifs: Gif[]) { // recebe dados do pai através da função - da página inicial
    this.gifs = gifs;
    this.currentPageNumber = 1; // Resetar a página para 1 quando os dados são atualizados
  }
}
