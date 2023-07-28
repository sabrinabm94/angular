import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public componentTitle:string = "";

  constructor() {}

  ngOnInit() {
    this.componentTitle = 'Buscar por prestadores de serviços';
  }
}
