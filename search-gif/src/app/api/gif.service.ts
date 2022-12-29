import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Gif } from '../data/gif';

@Injectable({
  providedIn: 'any',
})
export class GifService {
  private apiKey: string = 'MeGG5sG2LWbeS2S6FhMHEBByZ51gsRie';
  private shortUrl: string = '//api.giphy.com/v1/gifs/search?q=';
  public limitPattern: string = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  public termPattern: string = '^[a-zA-Z0-9]*$';
  public headers = { headers: new HttpHeaders() };
  public maxLimit = 50;
  private english = "en";
  private spanish = "es";
  private portuguese = "pt";
  private brazilianPortuguese = "pt-br";

  constructor(private http: HttpClient) {}

  getUrl(term: string, limit: number): string {
    return this.shortUrl + term + '&api_key=' + this.apiKey + '&limit=' + limit + '&lang=' + this.english;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  searchGif(term: string, limit: number): any {
    if(!limit) {
      limit = this.maxLimit;
    }
    let url: string = this.getUrl(term, limit);
    return this.http.get<Gif[]>(`${url}`, this.headers);
  }

  searchGifObservable(term: string, limit: number): Observable<any> {
    if(!limit) {
      limit = this.maxLimit;
    }
    let url: string = this.getUrl(term, limit);
    return this.http.get<Gif[]>(`${url}`, this.headers);
  }
}
