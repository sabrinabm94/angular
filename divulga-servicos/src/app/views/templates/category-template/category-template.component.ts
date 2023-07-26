import { Component } from '@angular/core';
import { ICategory } from 'src/app/utils/interfaces/ICategory.interface';

@Component({
  selector: 'app-category-template',
  templateUrl: './category-template.component.html',
  styleUrls: ['./category-template.component.css'],
})
export class CategoryTemplateComponent {
  public category: ICategory = {
    id: '',
    name: '',
    description: '',
    link: '',
    slug: '',
    images: [
      {
        link: '',
        title: '',
      },
    ],
  };
}
