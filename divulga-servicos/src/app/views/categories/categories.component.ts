import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackgroundImageComponent } from 'src/app/components/background-image/background-image.component';
import { ICategories } from 'src/app/utils/interfaces/Icategories.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public pageParams: object = {};

  @ViewChildren(BackgroundImageComponent)
  backgroundImageComponents!: QueryList<BackgroundImageComponent>;

  public componentParams: Array<ICategories> = [
    {
      name: 'Assistência técnica',
      description:
        'Conheça profissionais de' +
        name +
        'para atender para encontrar e solucionar problemas.',
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Assistência técnica',
        },
      ],
      subcategories: [
        {
          name: 'Montagem de imóveis',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          images: [
            {
              link: '../../../assets/images/category/montagem-moveis.png',
              title: 'Montagem de imóveis',
            },
          ],
        },
        {
          name: 'Reparos residenciais',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          images: [
            {
              link: '../../../assets/images/category/reparos-residenciais.png',
              title: 'Reparos residenciais',
            },
          ],
        },
      ],
    },
    {
      name: "Serviços de limpeza",
      description: "Conheça profissionais de" + name + "para atender o seu domicílio.",
      images: [{
        link: '../../../assets/images/category/servicos-limpeza.png',
        title: 'Serviços de limpeza',
      }],
      subcategories: [
        {
          name: 'Limpeza residencial',
          description:
            'Conheça profissionais de' +
            name +
            'para atender o seu domicílio.',
          images: [
            {
              link: '../../../assets/images/category/montagem-moveis.png',
              title: 'Limpeza residencial',
            },
          ],
        },
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageParams = this.route.snapshot.params;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //avoid ExpressionChangedAfterItHasBeenCheckedError
      this.sendDataToChildComponents(this.componentParams);
    });
  }

  public sendDataToChildComponents(data: any) {
    this.backgroundImageComponents.forEach(
      (backgroundImageComponent, index) => {
        backgroundImageComponent.sendData(data[index].images.link);
      }
    );
  }
}
