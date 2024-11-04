import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslocoModule,
  ],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent {
}
