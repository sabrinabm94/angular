import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Gif } from '../../data/models/gif';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private readonly API_KEY = environment.apiKey;
  private readonly BASE_URL = environment.baseUrl;
  private readonly MAX_LIMIT = 50;
  private readonly LANG = 'en';
  private readonly HEADERS = { headers: new HttpHeaders() };

  constructor(private http: HttpClient) {}

  private buildUrl(term: string, limit: number): string {
    return `${this.BASE_URL}?q=${encodeURIComponent(term)}&api_key=${this.API_KEY}&limit=${limit}&lang=${this.LANG}`;
  }

  searchGifs(term: string, limit: number = this.MAX_LIMIT): Observable<Gif[]> {
    const url = this.buildUrl(term, limit);
    return this.http.get<Gif[]>(url, this.HEADERS).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
