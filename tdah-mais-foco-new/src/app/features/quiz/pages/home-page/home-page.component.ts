import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../../../../core/transloco/transloco-root.module';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslocoModule,
    TranslocoRootModule,
  ],
  providers: [TranslocoService, LanguageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  results: any;

  constructor(private translocoService: TranslocoService) {}
}
