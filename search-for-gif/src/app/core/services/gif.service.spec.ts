import { TestBed } from '@angular/core/testing';
import { GifService } from './gif.service';
import { Gif } from '../../data/models/gif.model';
import {
  GENERIC_ERROR,
  NO_RESULTS_FOUND_ERROR,
  SEARCH_TERM_EMPTY_ERROR,
} from '../../data/const';

describe('GifService', () => {
  let service: GifService;

  // constantes
  const defaultGifDataLimit = 2;
  const defaultGifDataEmpty = [];
  const defaultInvalidGifSearchTerm = 'naoexistegitparaessetermo';
  const defaultEmptyString = '';
  const defaultGifData: Gif[] = [
    {
      id: '1',
      title: 'Funny Cat',
      previewGif: 'url',
      searchTerm: defaultEmptyString,
      alt_text: defaultEmptyString,
      type: defaultEmptyString,
      previewWebp: defaultEmptyString,
    },
    {
      id: '2',
      title: 'Dancing Dog',
      previewGif: 'url',
      searchTerm: defaultEmptyString,
      alt_text: defaultEmptyString,
      type: defaultEmptyString,
      previewWebp: defaultEmptyString,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GifService],
    });
    service = TestBed.inject(GifService);
  });

  describe('Dado que o usuário informa um termo de busca válido', () => {
    beforeEach(() => {
      spyOn(window, 'fetch').and.resolveTo(
        new Response(
          JSON.stringify({
            data: defaultGifData,
          })
        )
      );
    });

    it('deve retornar uma lista de gifs', async () => {
      const term = defaultGifData[0].title;
      const gifs = await service.searchGifs(term, defaultGifDataLimit);

      expect(gifs.length).toBe(defaultGifDataLimit);
      expect(gifs[0].title).toBe(defaultGifData[0].title);
    });
  });

  describe('Quando o termo de busca está vazio', () => {
    it('deve lançar um erro informando que o termo é obrigatório', async () => {
      await expectAsync(
        service.searchGifs(defaultEmptyString, defaultGifDataLimit)
      ).toBeRejectedWithError(SEARCH_TERM_EMPTY_ERROR);
    });
  });

  describe('Quando a API retorna uma lista vazia', () => {
    beforeEach(() => {
      spyOn(window, 'fetch').and.resolveTo(
        new Response(JSON.stringify({ data: defaultGifDataEmpty }))
      );
    });

    it('deve lançar um erro informando que nenhum gif foi encontrado', async () => {
      await expectAsync(
        service.searchGifs(defaultInvalidGifSearchTerm, defaultGifDataLimit)
      ).toBeRejectedWithError(NO_RESULTS_FOUND_ERROR);
    });
  });

  describe('Quando ocorre um erro na requisição', () => {
    beforeEach(() => {
      spyOn(window, 'fetch').and.rejectWith(new Error('Network Error'));
    });

    it('deve lançar um erro genérico', async () => {
      await expectAsync(
        service.searchGifs('fail', defaultGifDataLimit)
      ).toBeRejectedWithError(GENERIC_ERROR);
    });
  });

  describe('Dado que há uma requisição em andamento', () => {
    it('deve cancelar a requisição anterior antes de iniciar uma nova', async () => {
      // simula um atraso artificial para manter uma requisição pendente
      let resolveFirst: Function;
      const firstFetch = new Promise<Response>((resolve) => {
        resolveFirst = () =>
          resolve(new Response(JSON.stringify({ data: defaultGifDataEmpty })));
      });

      const fetchSpy = spyOn(window, 'fetch').and.returnValues(
        firstFetch,
        Promise.resolve(
          new Response(
            JSON.stringify({
              data: defaultGifData[0],
            })
          )
        )
      );

      const firstCall = service.searchGifs('first', 1);

      // cria uma nova requisição sem ter concluído a primeira
      const secondCall = service.searchGifs('second', 1);

      // resolve a primeira requisição
      resolveFirst!();

      const result = await secondCall;
      expect(result.length).toBe(1);
      expect(result[0].title).toBe(defaultGifData[0].title);
      expect(fetchSpy).toHaveBeenCalledTimes(defaultGifDataLimit);
    });
  });
});
