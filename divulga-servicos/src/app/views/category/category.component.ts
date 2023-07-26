import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/utils/interfaces/Icategory.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public slug: string | null = '';

  public componentParams: Array<ICategory> = [
    {
      id: '1',
      name: 'Assistência técnica',
      description:
        'Conheça profissionais de' +
        name +
        'para atender para encontrar e solucionar problemas.',
      link: '/assistencia-tecnica',
      slug: 'assistencia-tecnica',
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Assistência técnica',
        },
      ],
      subcategories: [
        {
          id: '3',
          name: 'Montagem de imóveis',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          link: '/montagem-de-moveis',
          slug: 'montagem-de-moveis',
          images: [
            {
              link: '../../../assets/images/category/montagem-moveis.png',
              title: 'Montagem de imóveis',
            },
          ],
        },
        {
          id: '2',
          name: 'Reparos residenciais',
          description:
            'Conheça profissionais de' +
            name +
            'para atender para encontrar e solucionar problemas.',
          link: '/reparos-residenciais',
          slug: 'reparos-residenciais',
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
          id: '4',
          name: 'Serviços de limpeza',
          description:
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
          link: '/servicos-de-limpeza',
          slug: 'servicos-de-limpeza',
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.getCategoryBySlug(this.slug);
  }

  getCategoryBySlug(slug: string | null) {
    console.log(slug);
    return null;
  }
}
