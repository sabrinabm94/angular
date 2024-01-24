import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ServiceTypeTransformation from '../../../services/typeTransformation.service';
import TrackByFn from '../../../utils/trackByFn';
import { IProfessional } from '../../../utils/interfaces/IProfessional';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent {
  public slug: string | null = '';
  public noNeighborhood = null;

  public componentParams: Array<IProfessional> = [
    {
      id: '1',
      name: 'Joana Maria',
      lastname: 'da Costa',
      link: '/joana-m-costa',
      slug: 'joana-m-costa',
      cpf: '',
      password: '',
      passwordConfirmation: '',
      localization: {
        country: "Brasil",
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        street: 'Rua São Paulo',
        number: 200,
        complement: 'residencial florida, apto 302',
        cep: 88390000,
      },
      serviceArea: {
        country: "Brasil",
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Jardins',
      },
      images: [
        {
          link: '../../../assets/images/category/montagem-moveis.png',
          title: 'Imagem do professional',
        },
      ],
      socialNetworks: [
        { name: 'phone', value: '47999501834' },
        { name: 'email', value: 'joanamariacosta@gmail.com' },
        {
          name: 'whatsapp',
          value:
            'https://wa.me/5547999501834?text=Oi,%20vim%20pelo%20Busca%20Profissionais',
        },
        { name: 'instagram', value: '' },
        { name: 'facebook', value: '' },
        { name: 'twitter', value: '' },
        { name: 'linkedin', value: '' },
        { name: 'site', value: '' },
      ],
      categories: [
        {
          id: '4',
          name: 'Serviços de limpeza',
          description:
            'Conheça profissionais de' + name + 'para atender o seu domicílio.',
          link: '/limpeza',
          slug: 'limpeza',

          images: [
            {
              link: '../../../assets/images/category/servicos-limpeza.png',
              title: 'Serviços de limpeza',
            },
          ],
          subcategories: [
            {
              id: '5',
              name: 'Limpeza residencial',
              description:
                'Conheça profissionais de' +
                name +
                'para atender o seu domicílio.',
              link: '/limpeza-residencial',
              slug: 'limpeza-residencial',
              images: [
                {
                  link: '../../../assets/images/category/montagem-moveis.png',
                  title: 'Limpeza residencial',
                },
              ],
            },
          ],
          professionals: [],
        },
      ],
      serviceDescription: 'Atuo a mais de 10 anos como diarista.',
      serviceType: [ServiceTypeTransformation.serviceTypeTransformation(1)],
      email: '',
      emailConfirmation: '',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.getProfessionalBySlug(this.slug);
  }

  getProfessionalBySlug(slug: string | null) {
    console.log(slug);
    return null;
  }

  trackByFn(item: any, index: any) {
    return TrackByFn.getItemId(item);
  }
}
