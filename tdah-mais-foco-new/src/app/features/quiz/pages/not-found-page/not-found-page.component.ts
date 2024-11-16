import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { TranslocoRootModule } from '../../../../core/transloco/transloco-root.module';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslocoModule,
    TranslocoRootModule,
  ],
  providers: [TranslocoService, LanguageService],
})
export class NotFoundPageComponent {
  constructor(private translocoService: TranslocoService) {}
}
