import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GifService } from './gif.service';
import { environment } from '../../../environments/environment.prod';
import { Gif } from '../../data/models/gif.model';

describe('GifService', () => {
  let service: GifService;
  let httpMock: HttpTestingController;

  const mockGifs: Gif[] = [
    new Gif(
      '',
      '1',
      'Gif 1',
      'Alt 1',
      'gif',
      'http://example.com/1.gif',
      'http://example.com/1-preview.gif'
    ),
    new Gif(
      '',
      '2',
      'Gif 2',
      'Alt 2',
      'gif',
      'http://example.com/2.gif',
      'http://example.com/2-preview.gif'
    ),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GifService]
    });

    service = TestBed.inject(GifService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a URL to search term', () => {
    const term = 'cat';
    const limit = 3;
    const expectedUrl = `${environment.baseUrl}?q=${encodeURIComponent(term)}&api_key=${environment.apiKey}&limit=${limit}&lang=en`;
    expect(service['buildUrl'](term, limit)).toBe(expectedUrl);
  });

  it('should receive a GIFs list for a search term', () => {
    const term = 'cat';
    service.searchGifs(term).subscribe((gifs) => {
      expect(gifs.length).toBe(2); // Adjust to match the length of mockGifs
      expect(gifs).toEqual(mockGifs);
    });

    const req = httpMock.expectOne((request) => request.url.includes(term) && request.url.includes(environment.apiKey));
    expect(req.request.method).toBe('GET');
    req.flush(mockGifs);
  });

  it('should handle empty search term error', () => {
    service.searchGifs('').subscribe(
      () => fail('expected an error, not GIFs'),
      (error) => expect(error.message).toContain('Search term cannot be empty.')
    );
  });

  it('should handle HTTP errors correctly', () => {
    const term = 'cat';
    const errorMsg = 'mock 404 error occurred';
    service.searchGifs(term).subscribe(
      () => fail('expected an error, not GIFs'),
      (error) => expect(error.message).toContain('Something went wrong; please try again later.')
    );

    const req = httpMock.expectOne((request) => request.url.includes(term) && request.url.includes(environment.apiKey));
    expect(req.request.method).toBe('GET');
    req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
  });
});
