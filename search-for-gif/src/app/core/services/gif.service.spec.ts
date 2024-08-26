import { TestBed } from '@angular/core/testing';
import { GifService } from './gif.service';
import { environment } from '../../../environments/environment';

describe('GifService', () => {
  let service: GifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchGifs', () => {
    const mockGifResponse = {
      data: [
        {
          id: '1',
          title: 'Gif Title 1',
          alt_text: 'Gif Alt Text 1',
          type: 'gif',
          images: {
            preview_gif: { url: 'https://example.com/gif1.gif' },
            preview_webp: { url: 'https://example.com/gif1.webp' },
          },
        },
      ],
    };

    beforeEach(() => {
      spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify(mockGifResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    });

    it('should build the correct URL', async () => {
      const term = 'test';
      const limit = 5;
      const expectedUrl = `${environment.baseUrl}?q=${encodeURIComponent(term)}&api_key=${environment.apiKey}&limit=${limit}&lang=${environment.lang}`;

      await service.searchGifs(term, limit);

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, {
        headers: { 'Content-Type': 'application/json' },
        signal: jasmine.any(AbortSignal)
      });
    });

    it('should return a list of GIFs when search is successful', async () => {
      const gifs = await service.searchGifs('test', 1);

      expect(gifs.length).toBe(1);
      expect(gifs[0].id).toBe('1');
      expect(gifs[0].title).toBe('Gif Title 1');
    });

    it('should throw an error if the search term is empty', async () => {
      try {
        await service.searchGifs('', 1);
        fail('The search should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('Search term cannot be empty.');
      }
    });

    it('should default the limit to MAX_LIMIT if not provided', async () => {
      const term = 'test';
      const expectedUrl = `${environment.baseUrl}?q=${encodeURIComponent(term)}&api_key=${environment.apiKey}&limit=${environment.maxLimit}&lang=${environment.lang}`;

      await service.searchGifs(term, 0);

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, {
        headers: { 'Content-Type': 'application/json' },
        signal: jasmine.any(AbortSignal)
      });
    });

    it('should throw an error if no GIFs are found', async () => {
      spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));

      try {
        await service.searchGifs('nonexistent', 1);
        fail('The search should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('No gifs found.');
      }
    });

    it('should handle network errors', async () => {
      spyOn(window, 'fetch').and.rejectWith(new Error('Network response was not ok.'));

      try {
        await service.searchGifs('test', 1);
        fail('The search should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('Something went wrong; please try again later.');
      }
    });

    it('should abort a previous request if a new one is made', async () => {
      const abortSpy = spyOn(AbortController.prototype, 'abort').and.callThrough();

      const firstSearch = service.searchGifs('test1', 1);
      const secondSearch = service.searchGifs('test2', 1);

      await secondSearch;

      expect(abortSpy).toHaveBeenCalled();
      expect(await firstSearch).toBeUndefined();  // The first request should be aborted
    });

    it('should log a message if the request is aborted', async () => {
      spyOn(console, 'log');

      const abortSpy = spyOn(AbortController.prototype, 'abort').and.callFake(() => {
        throw new DOMException('AbortError', 'AbortError');
      });

      service.searchGifs('test', 1).catch(() => { });

      abortSpy.calls.mostRecent();

      expect(console.log).toHaveBeenCalledWith('Request was aborted');
    });
  });
});
