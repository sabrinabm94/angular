import { Component, QueryList, ViewChildren } from '@angular/core';
import { LinkComponent } from 'src/app/components/link/link.component';
import { IFooter } from 'src/app/utils/interfaces/footer.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @ViewChildren(LinkComponent)
  linkComponents!: QueryList<LinkComponent>;

  public footerParams: IFooter = {
    phoneNumber: '47-99957-1726',
    email: 'contato@busqueprofissionais.com.br',
    menu: [
      {
        link: '/politica-privacidade',
        target: '_self',
        title: 'Política de privacidade',
        text: 'Política de privacidade',
      },
      {
        link: '/termos-de-uso',
        target: '_self',
        title: 'Termos de uso',
        text: 'Termos de uso',
      },
    ],
    scripts: '',
    copyright: 'Copyright 2023 Busque Serviços - Todos os direitos reservados',
  };

  ngAfterViewInit() {
    this.sendDataToChildComponents(this.footerParams.menu);
  }

  public sendDataToChildComponents(data: any) {
    this.linkComponents.forEach((child, index) => {
      child.sendData(data[index]);
    });
  }
}
