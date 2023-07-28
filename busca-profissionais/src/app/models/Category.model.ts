export class Category {
  id: number = 0;
  name: string = "";
  slug: string = "";
  subCategories?: Array<Category>;
  imageUrl?: string;
}
