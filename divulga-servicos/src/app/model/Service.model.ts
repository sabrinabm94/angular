import { Category } from "./Category.model";

export class Service {
  id: number;
  name: string;
  categories?: Array<Category>;
  imageUrl?: string;
}
