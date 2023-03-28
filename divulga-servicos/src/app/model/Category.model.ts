export class Category {
  id: number;
  name: string;
  slug: string;
  subCategories?: Array<Category>;
  imageUrl?: string;
}
