import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GifService } from './gif.service';
import { Gif } from '../../data/models/gif';
import { environment } from '../../../environments/environment';

describe('GifService', () => {
  let service: GifService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GifService],
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

  it('should fetch gifs based on search term', () => {
    const dummyGifs: Gif[] = [
      {
        id: '1', url: 'http://testgif1.com',
        image: {
          name: 'Image 1',
          url: 'http://testimage1.com'
        }
      },
      {
        id: '2', url: 'http://testgif2.com',
        image: {
          name: 'Image 2',
          url: 'http://testimage2.com'
        }
      },
    ];

    const term = 'test';
    const limit = 10;
    const url = `${environment.baseUrl}?q=${encodeURIComponent(term)}&api_key=${
      environment.apiKey
    }&limit=${limit}&lang=en`;

    service.searchGifs(term, limit).subscribe((gifs) => {
      expect(gifs.length).toBe(2);
      expect(gifs).toEqual(dummyGifs);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGifs);
  });

  it('should handle error', () => {
    const term = 'test';
    const limit = 10;
    const url = `${environment.baseUrl}?q=${encodeURIComponent(term)}&api_key=${
      environment.apiKey
    }&limit=${limit}&lang=en`;

    service.searchGifs(term, limit).subscribe(
      () => fail('should have failed with the error'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe(
          'Something went wrong; please try again later.'
        );
      }
    );

    const req = httpMock.expectOne(url);
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
