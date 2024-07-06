import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-template',
  templateUrl: './results-template.component.html',
  styleUrls: ['./results-template.component.css'],
})
export class ResultsTemplateComponent implements OnInit {
  @HostBinding('class') class: string = "app-results-template";

  public data: any[] = [];
  p: number = 1;

  constructor() {}

  ngOnInit(): void {}

  public setData(data: any) { //recebe dados do pai através da função - da página inicial
    this.data = data;
  }
}
