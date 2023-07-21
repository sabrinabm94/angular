import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public componentTitle:string = "";

  constructor() {}

  ngOnInit() {
    this.componentTitle = 'Buscar por prestadores de serviços';
  }
}
