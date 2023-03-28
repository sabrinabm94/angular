import { Gender } from "../utils/enums/Gender";
import { Role } from "../utils/enums/Role";
import { UserType } from "../utils/enums/UserType";
import { UserDocumentType } from "../utils/enums/pagarme/UserDocumentType";
import { Address } from "./Address.model";
import { Phone } from "./Phone.model";

export class User {
  id: string = ""; //formato cus_XXXXXXXXXXXXXXXX
  role: Role = Role.user;
  isActive: boolean = false;
  name: string = "";
  type: UserType = UserType.individual;
  document_type: UserDocumentType = UserDocumentType.cpf;
  gender: Gender = Gender.male;
  email: string = "";
  password: string = "";
  imageUrl?: string;
  address: Address = new Address;
  phones: Array<Phone> = [];
  birthdate: string = "";
}
