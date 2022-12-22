import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gif } from '../model/gif';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class GifSearchService {
    private apiKey: string = "MeGG5sG2LWbeS2S6FhMHEBByZ51gsRie";
    private shortUrl: string = "//api.giphy.com/v1/gifs/search?q=";
    public limitPatter: string = "^-?[0-9]\\d*(\\.\\d{1,2})?$";
    public termPatter: string = "^[a-zA-Z0-9]*$";
    //public headers = { headers: new HttpHeaders().set("Authorization", "Bearer 123") };
    public headers = { headers: new HttpHeaders() };

    constructor(private http: HttpClient) {

    }

    getUrl(term: string, limit: number): string {
        return this.shortUrl + term + "&api_key=" +  this.apiKey + "&limit=" + limit;
    }

    getApiKey(): string {
        return this.apiKey;
    }

<<<<<<< Updated upstream
    searchGif(term: string, limit: number): any {
        let url: string = this.getUrl(term, limit);
        return  this.http.get<Gif[]>(`${url}`, this.headers);
    }

    searchGifObservable(term: string, limit: number): Observable<any> {
        let url: string = this.getUrl(term, limit);
        return  this.http.get<Gif[]>(`${url}`, this.headers);
=======
    //modelo assincrono, fazemos uma requisição sem bloquear a aplicação esperando sua resposta.
    searchGif(term:string, limit:number):any {
        let url:string = this.getUrl(term, limit);
        return this.http.get(`${url}/`);
>>>>>>> Stashed changes
    }
}