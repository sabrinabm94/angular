import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Input } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @HostBinding('class') class: string = "app-results-template";

  @Input() gifs: Gif[] = [];

  p: number = 1;

  handlePageChange(event: number) {
    this.p = event;
  }

  public setData(gifs: Gif[]) { // recebe dados do pai através da função - da página inicial
    this.gifs = gifs;
  }
}
