import { Images } from "./images.model";

export interface Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt_text: string;
  type: string;
  images: {
    preview_gif: {
      url: string;
    }
    preview_webp: {
      url: string;
    }
  }
}

export class Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt_text: string;
  type: string;
  images: {
    preview_gif: {
      url: string;
    }
    preview_webp: {
      url: string;
    }
  }

  constructor(searchTerm: string, id: string, title: string, altText: string, type: string, url: string, urlPreview:string) {
    this.searchTerm = searchTerm;
    this.id = id;
    this.title = title;
    this.alt_text = altText;
    this.type = type;
    this.images.preview_gif.url = url;
    this.images.preview_webp.url = urlPreview;
  }
}
