import { Role } from "../utils/enums/Role";

export class User {
  id: number;
  role: Role;
  isActive: boolean;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
}
