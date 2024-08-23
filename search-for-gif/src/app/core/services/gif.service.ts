import { Injectable } from '@angular/core';
import { Gif } from '../../data/models/gif.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private readonly API_KEY = environment.apiKey;
  private readonly BASE_URL = environment.baseUrl;
  private readonly MAX_LIMIT = environment.maxLimit || 10;
  private readonly LANG = environment.lang || 'en';

  private abortController: AbortController | undefined;

  constructor() {}

  /**
   * Builds the URL for the API request.
   * @param term The search term.
   * @param limit The maximum number of results to return.
   * @returns The constructed URL.
   */
  private buildUrl(term: string, limit: number): string {
    const encodedTerm = encodeURIComponent(term);
    return `${this.BASE_URL}?q=${encodedTerm}&api_key=${this.API_KEY}&limit=${limit}&lang=${this.LANG}`;
  }

  /**
   * Searches for GIFs based on the provided term and limit.
   * @param term The search term.
   * @param limit The maximum number of results to return.
   * @returns A Promise of the GIF results.
   */
  async searchGifs(term: string, limit: number): Promise<Gif[]> {
    if (!term.trim()) {
      throw new Error('Search term cannot be empty.');
    }

    limit = limit || this.MAX_LIMIT;
    const url = this.buildUrl(term, limit);

    // Cancela a requisição anterior, se houver
    if (this.abortController) {
      this.abortController.abort();
    }

    // Cria um novo AbortController para a nova requisição
    this.abortController = new AbortController();

    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      if (data?.data && data.data.length > 0) {
        return data.data;
      } else {
        throw new Error('No gifs found.');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('An error occurred:', error);
        throw new Error('Something went wrong; please try again later.');
      }
    }
  }
}
