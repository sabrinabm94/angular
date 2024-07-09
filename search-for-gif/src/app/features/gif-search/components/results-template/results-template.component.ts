import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Input } from '@angular/core';
import { PictureComponent } from "../../../../shared/components/picture/picture.component";
import { Gif } from '../../../../data/models/gif.model';

@Component({
    selector: 'app-results-template',
    standalone: true,
    imports: [PictureComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], //para permitir o uso do component web de paginação (3 party)
    templateUrl: './results-template.component.html',
    styleUrl: './results-template.component.css',
})
export class ResultsTemplateComponent {
  @HostBinding('class') class: string = "app-results-template";
  @Input()
  gifs!: Gif[];
  @Input()
  data!: any[];

  p: number = 1;

  handlePageChange(event: number) {
    this.p = event;
  }

  public setData(data: any) { //recebe dados do pai através da função - da página inicial
    this.data = data;
  }

}
