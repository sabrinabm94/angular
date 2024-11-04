import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { AfterViewInit, Component, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, HostBinding, Injector, ViewChild, ViewContainerRef } from "@angular/core";
import { TranslocoModule } from "@ngneat/transloco";
import { QuizComponent } from "../../components/quiz/quiz.component";
import { ResultsComponent } from "../../components/results/results.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    QuizComponent,
    ResultsComponent,
    TranslocoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

}
