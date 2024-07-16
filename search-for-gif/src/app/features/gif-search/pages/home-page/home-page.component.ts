import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { Gif } from 'src/app/data/models/gif.model';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { SearchFormComponent } from '../../components/search-form/search-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SearchResultsComponent,
    SearchFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  @ViewChild(SearchResultsComponent)
  SearchResultsComponent!: SearchResultsComponent;

  @HostBinding('class') class: string = 'app-home-page';

  public gifs: Gif[] = [];

  constructor() { }

  public setDataInChild(data: any) {
    if (this.SearchResultsComponent && data) {
      this.SearchResultsComponent.setData(data); //send data to child by function - to results template
    } else {
      console.error('SearchResultsComponent is not defined');
    }
  }
}
