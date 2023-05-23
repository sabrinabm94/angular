export class Address {
  id: string = ""; //formato addr_XXXXXXXXXXXXXXXX
  name: string = "";
  street: string = "";
  number: number = 0;
  neighborhood: string = "";
  complement: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  zip_code: string = ""
  line_1: string = this.number + "," + this.street + "," + this.neighborhood;
  line_2: string = this.complement;
}
