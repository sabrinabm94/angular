import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  GENERIC_ERROR,
  NO_RESULTS_FOUND_ERROR,
  REQUEST_ABORTED,
  SEARCH_TERM_EMPTY_ERROR,
} from 'src/app/data/const';
import { GifBackend } from 'src/app/data/models/gif-backend';

/**
 * Serviço responsável por buscar gifs
 */
@Injectable({
  providedIn: 'root',
})
export class GifService {
  // constantes com fallback de valores
  private readonly API_KEY: string = environment.apiKey;
  private readonly BASE_URL: string = environment.baseUrl;
  private readonly MAX_LIMIT: number = environment.maxLimit || 10;
  private readonly LANG: string = environment.lang || 'en';
  private abortController: AbortController | undefined;

  /**
   * Construi a url encapsulada para utilizar na requisição
   * @param {string} term termo utilizado para busca
   * @param {string} limit limite máximo de resultados retornados
   * @returns {string} string da url gerada
   */
  private buildUrl(term: string, limit: number): string {
    const encodedTerm: string = encodeURIComponent(term);
    const baseUrl: string = this.BASE_URL;
    const apiKey: string = this.API_KEY;
    const lang: string = this.LANG;

    return `${baseUrl}?q=${encodedTerm}&api_key=${apiKey}&limit=${limit}&lang=${lang}`;
  }

  /**
   * Busca por gifs baseado em um termo
   * @param {string} term termo utilizado para busca
   * @param {string} limit limite máximo de resultados retornados
   * @returns {Promise<Gif[]>} listagem de resultados encontrados
   */
  async searchGifs(term: string, limit: number): Promise<GifBackend[]> {
    if (!term.trim()) {
      throw new Error(SEARCH_TERM_EMPTY_ERROR);
    }

    limit = limit || this.MAX_LIMIT;
    const url = this.buildUrl(term, limit);

    if (url) {
      // Cancela a requisição anterior caso tenha (evita mal gerenciamento de concorrência - race conditions)
      if (this.abortController) {
        this.abortController.abort(); // api nativa js que permite cancelar requisições assíncronas feitas com fetch
      }

      // Cria um novo AbortController para a nova requisição
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' },
          signal: signal, // passado o abortController como signal para que seja possível cancelar, se for o caso
        });

        const data = await response.json();
        if (data?.data && data.data.length > 0) {
          // validação do resultado da requisição
          return data.data;
        } else {
          throw new Error(NO_RESULTS_FOUND_ERROR);
        }
      } catch (error: any) {
        if (error?.name === 'AbortError') {
          console.warn(REQUEST_ABORTED);
          return [];
        }

        if (
          error.message === NO_RESULTS_FOUND_ERROR ||
          error.message === SEARCH_TERM_EMPTY_ERROR
        ) {
          throw error;
        }

        console.error('Erro ao buscar gifs:', error);
        throw new Error(GENERIC_ERROR);
      }
    }
  }
}
