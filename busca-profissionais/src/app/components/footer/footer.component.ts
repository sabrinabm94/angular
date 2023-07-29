import { Component } from '@angular/core';
import { IFooter } from 'src/app/utils/interfaces/IFooter.interface';
import TrackByFn from '../../utils/trackByFn';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public componentParams: IFooter = {
    phoneNumber: '47-99957-1726',
    email: 'contato@busqueprofissionais.com.br',
    menu: [
      {
        link: '/politica-privacidade',
        target: '_self',
        title: 'Política de privacidade',
      },
      {
        link: '/termos-de-uso',
        target: '_self',
        title: 'Termos de uso',
      },
    ],
    scripts: '',
    copyright: 'Copyright 2023 Busque Serviços - Todos os direitos reservados',
    images: {
      logo: {
        link: '',
        title: 'Logo do Busca Profissionais',
        width: 80,
        height: 80,
      },
    },
  };

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
