import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ResultsTemplateComponent } from '../../components/results-template/results-template.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
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
