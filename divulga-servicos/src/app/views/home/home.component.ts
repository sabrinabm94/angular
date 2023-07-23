import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public projectTitle:string = "";
  public projectDescription:string = "";

  constructor() {}

  ngOnInit() {
    this.projectTitle = 'Buscar profissionais';
    this.projectDescription = 'Buscar por prestadores de serviços';
  }
}
