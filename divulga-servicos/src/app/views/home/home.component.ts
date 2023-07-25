import { Component, QueryList, ViewChildren } from '@angular/core';
import { BackgroundImageComponent } from 'src/app/components/background-image/background-image.component';
import { ImageComponent } from 'src/app/components/image/image.component';
import { IHome } from 'src/app/utils/interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public projectTitle: string = '';
  public projectDescription: string = '';

  @ViewChildren(ImageComponent)
  imageComponents!: QueryList<ImageComponent>;

  @ViewChildren(BackgroundImageComponent)
  backgroundImageComponents!: QueryList<BackgroundImageComponent>;

  public componentParams: IHome = {
    images: [
      {
        link: '../../../assets/images/home/professional-search.png',
        title: 'Busque pelo profissional',
        width: 150,
        height: 150,
      },
      {
        link: '../../../assets/images/home/professional-get-in-contact.png',
        title: 'Entre em contato direto com o profissional',
        width: 150,
        height: 150,
      },
      {
        link: '../../../assets/images/home/professional-talk.png',
        title: 'Explique sua demanda',
        width: 150,
        height: 150,
      },
    ],
    backgroundImages: [
      {
        link: '',
        title: '',
      },
      {
        link: '',
        title: '',
      },
      {
        link: '../../../assets/images/category/montagem-moveis.png',
        title: 'Montagem de imóveis',
      },
      {
        link: '../../../assets/images/category/reparos-residenciais.png',
        title: 'Reparos residenciais',
      },
      {
        link: '../../../assets/images/category/servicos-limpeza.png',
        title: 'Serviços de limpeza',
      },
    ],
  };

  constructor() {}

  ngOnInit() {
    this.projectTitle = 'Buscar profissionais';
    this.projectDescription = 'Buscar por prestadores de serviços';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //avoid ExpressionChangedAfterItHasBeenCheckedError
      this.sendDataToChildComponents(this.componentParams);
    });
  }

  public sendDataToChildComponents(data: any) {
    this.imageComponents.forEach((imageComponent, index) => {
      imageComponent.sendData(data.images[index]);
    });
  }
}
