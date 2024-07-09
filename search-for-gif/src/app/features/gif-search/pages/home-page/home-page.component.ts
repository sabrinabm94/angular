import { Component, HostBinding, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { SearchTemplateComponent } from "../../components/search-template/search-template.component";
import { ResultsTemplateComponent } from "../../components/results-template/results-template.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
    selector: 'app-home-page',
    standalone: false,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  @ViewChild(ResultsTemplateComponent)
  resultsTemplateComponent!: ResultsTemplateComponent;

  @HostBinding('class') class: string = 'app-home-page';

  public gifs: any[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  public setDataInChild(data: any) {
    this.resultsTemplateComponent.setData(data); //send data to child by function - to results template
  }
}
