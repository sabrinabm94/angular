export interface Image {
  name: string;
  url: string;
}

export class Images {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
