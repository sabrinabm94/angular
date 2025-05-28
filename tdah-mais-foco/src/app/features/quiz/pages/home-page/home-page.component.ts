import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TranslocoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  results: any;

  constructor(private translocoService: TranslocoService) {}
}
