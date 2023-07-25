import { Component, QueryList, ViewChildren } from '@angular/core';
import { LinkComponent } from 'src/app/components/link/link.component';
import { IFooter } from 'src/app/utils/interfaces/footer.interface';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @ViewChildren(LinkComponent)
  linkComponents!: QueryList<LinkComponent>;

  @ViewChildren(ImageComponent)
  imageComponents!: QueryList<ImageComponent>;

  public componentParams: IFooter = {
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
    images: {
      logo: {
        link: '',
        title: 'Logo do Busca Profissionais',
        width: 80,
        height: 80,
      },
    },
  };

  ngAfterViewInit() {
    setTimeout(() => { //avoid ExpressionChangedAfterItHasBeenCheckedError
      this.sendDataToChildComponents(this.componentParams);
    });
  }

  public sendDataToChildComponents(data: any) {
    this.linkComponents.forEach((linkComponent, index) => {
      linkComponent.sendData(data.menu[index]);
    });

    this.imageComponents.forEach((imageComponent, index) => {
      imageComponent.sendData(data.images.logo);
    });
  }
}
