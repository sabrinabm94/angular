export interface Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt_text: string;
  type: string;
  previewGif: string;
  previewWebp: string;
}

export class Gif {
  searchTerm: string;
  id: string;
  title: string;
  alt_text: string;
  type: string;
  previewGif: string;
  previewWebp: string;

  constructor(searchTerm: string, id: string, title: string, altText: string, type: string, url: string, urlPreview:string) {
    this.searchTerm = searchTerm;
    this.id = id;
    this.title = title;
    this.alt_text = altText;
    this.type = type;
    this.previewGif = url;
    this.previewWebp = urlPreview;
  }
}
