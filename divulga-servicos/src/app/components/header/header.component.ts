import { ViewChildren, QueryList, Component } from '@angular/core';
import { RouteLinkComponent } from 'src/app/components/route-link/route-link.component';
import { IHeader } from 'src/app/utils/interfaces/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChildren(RouteLinkComponent)
  routeLinkComponents!: QueryList<RouteLinkComponent>;

  constructor() {}

  public headerParams: IHeader = {
    menu: [
      {
        link: '/home',
        target: '_self',
        title: 'Home',
        text: 'Home',
      },
      {
        link: '/login',
        target: '_self',
        title: 'Login',
        text: 'Login',
      },
      {
        link: '/registro',
        target: '_self',
        title: 'Registro',
        text: 'Registro',
      },
      {
        link: '/categorias',
        target: '_self',
        title: 'Categorias',
        text: 'Categorias',
      },
      {
        link: '/contato',
        target: '_self',
        title: 'Contato',
        text: 'Contato',
      },
    ],
  };

  ngAfterViewInit() {
    this.sendDataToChildComponents(this.headerParams.menu);
  }

  public sendDataToChildComponents(data: any) {
    this.routeLinkComponents.forEach((child, index) => {
      child.sendData(data[index]);
    });
  }
}
