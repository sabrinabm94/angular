import { Category } from "./Category.model";

export class Service {
  id: number = 0;
  name: string = "";
  categories?: Array<Category>;
  imageUrl?: string;
}
