import { Component } from '@angular/core';
import { IHeader } from 'src/app/utils/interfaces/IHeader.interface';
import TrackByFn from '../../utils/trackByFn';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public componentParams: IHeader = {
    menu: [
      {
        link: '/home',
        target: '_self',
        title: 'Home',
      },
      {
        link: '/login',
        target: '_self',
        title: 'Login',
      },
      {
        link: '/registro',
        target: '_self',
        title: 'Registro',
      },
      {
        link: '/categorias',
        target: '_self',
        title: 'Categorias',
      },
      {
        link: '/contato',
        target: '_self',
        title: 'Contato',
      },
    ],
  };

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
