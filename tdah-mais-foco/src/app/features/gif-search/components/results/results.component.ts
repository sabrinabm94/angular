import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { PictureComponent } from '../../../../shared/components/picture/picture.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    PictureComponent,
    CommonModule,
    NgxPaginationModule,
    TranslocoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {

}
