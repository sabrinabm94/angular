import { Images } from "./images.model";

export interface Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt: string;
  type: string;
  url: string;
  urlPreview: string;
}

export class Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt: string;
  type: string;
  url: string;
  urlPreview: string;

  constructor(searchTerm: string, id: string, title: string, alt: string, type: string, url: string, urlPreview:string) {
    this.searchTerm = searchTerm;
    this.id = id;
    this.title = title;
    this.alt = alt;
    this.type = type;
    this.url = url;
    this.urlPreview = urlPreview;
  }
}
