import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gif } from '../../data/models/gif.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private readonly API_KEY = environment.apiKey;
  private readonly BASE_URL = environment.baseUrl;
  private readonly MAX_LIMIT = environment.maxLimit || 50; // Allow configuration from environment
  private readonly LANG = environment.lang || 'en';
  private readonly HEADERS = { headers: new HttpHeaders() };

  constructor(private http: HttpClient) {}

  /**
   * Builds the URL for the API request.
   * @param term The search term.
   * @param limit The maximum number of results to return.
   * @returns The constructed URL.
   */
  private buildUrl(term: string, limit: number): string {
    return `${this.BASE_URL}?q=${encodeURIComponent(term)}&api_key=${this.API_KEY}&limit=${limit}&lang=${this.LANG}`;
  }

  /**
   * Searches for GIFs based on the provided term and limit.
   * @param term The search term.
   * @param limit The maximum number of results to return.
   * @returns An Observable of the GIF results.
   */
  searchGifs(term: string, limit: number = this.MAX_LIMIT): Observable<Gif[]> {
    if (!term) {
      return throwError(() => new Error('Search term cannot be empty.'));
    }
    const url = this.buildUrl(term, limit);
    return this.http.get<Gif[]>(url, this.HEADERS).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error The HttpErrorResponse.
   * @returns An Observable that throws an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
