import { Component } from '@angular/core';
import { ICategory } from 'src/app/utils/interfaces/Icategory.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  public componentParams: Array<ICategory> = [
    {
      name: 'Assistência técnica',
      description:
        'Conheça profissionais de' +
        name +
        'para atender para encontrar e solucionar problemas.',
      link: '/assistencia-tecnica',
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
          link: '/montagem-de-moveis',
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
          link: '/reparos-residenciais',
          images: [
            {
              link: '../../../assets/images/category/reparos-residenciais.png',
              title: 'Reparos residenciais',
            },
          ],
        },
      ],
      relatedCategories: [
        {
          name: 'Serviços de limpeza',
          description:
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
          link: '/servicos-de-limpeza',
          images: [
            {
              link: '../../../assets/images/category/servicos-limpeza.png',
              title: 'Serviços de limpeza',
            },
          ],
        },
      ],
    },
  ];
}
