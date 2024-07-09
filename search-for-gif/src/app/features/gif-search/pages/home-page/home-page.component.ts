import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { Gif } from 'src/app/data/models/gif.model';
import { ResultsTemplateComponent } from '../../components/results-template/results-template.component';
import { SearchTemplateComponent } from '../../components/search-template/search-template.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ResultsTemplateComponent,
    SearchTemplateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild(ResultsTemplateComponent)
  resultsTemplateComponent!: ResultsTemplateComponent;

  @HostBinding('class') class: string = 'app-home-page';

  public gifs: Gif[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit home page ", this.resultsTemplateComponent);
  }

  public setDataInChild(data: any) {
    if (this.resultsTemplateComponent && data) {
      this.resultsTemplateComponent.setData(data); //send data to child by function - to results template
    } else {
      console.error('ResultsTemplateComponent is not defined');
    }
  }
}
