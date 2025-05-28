import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { GifService } from '../../../../core/services/gif.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Gif } from '../../../../data/interfaces/gif.model';
import { GifBackend } from '../../../../data/models/gif-backend';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let gifServiceSpy: jasmine.SpyObj<GifService>;
  const defaultEmptyString = '';
  const defaultInvalidValue = null;
  const defaultGifDataLimit = 2;

  const mockGifBackendResponse: GifBackend[] = [
    {
      id: '1',
      title: 'sabrina"s cat',
      alt_text: 'a cat',
      type: 'gif',
      images: {
        preview_gif: { url: 'http://preview.gif' },
        preview_webp: { url: 'http://preview.webp' },
      },
      analytics: {},
      analytics_response_payload: defaultEmptyString,
      bitly_gif_url: defaultEmptyString,
      bitly_url: defaultEmptyString,
      content_url: defaultEmptyString,
      embed_url: defaultEmptyString,
      import_datetime: defaultEmptyString,
      is_sticker: 0,
      rating: defaultEmptyString,
      slug: defaultEmptyString,
      source: defaultEmptyString,
      source_post_url: defaultEmptyString,
      source_tld: defaultEmptyString,
      trending_datetime: defaultEmptyString,
      url: defaultEmptyString,
      user: {},
      username: '',
    },
    {
      id: '2',
      title: 'dog',
      alt_text: 'a cat',
      type: 'gif',
      images: {
        preview_gif: { url: 'http://preview1.gif' },
        preview_webp: { url: 'http://preview1.webp' },
      },
      analytics: {},
      analytics_response_payload: defaultEmptyString,
      bitly_gif_url: defaultEmptyString,
      bitly_url: defaultEmptyString,
      content_url: defaultEmptyString,
      embed_url: defaultEmptyString,
      import_datetime: defaultEmptyString,
      is_sticker: 0,
      rating: defaultEmptyString,
      slug: defaultEmptyString,
      source: defaultEmptyString,
      source_post_url: defaultEmptyString,
      source_tld: defaultEmptyString,
      trending_datetime: defaultEmptyString,
      url: defaultEmptyString,
      user: {},
      username: '',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GifService', ['searchGifs']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslocoModule],
      declarations: [SearchFormComponent],
      providers: [{ provide: GifService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    gifServiceSpy = TestBed.inject(GifService) as jasmine.SpyObj<GifService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Formulário de busca', () => {
    it('deve ser inválido se o campo term estiver vazio', () => {
      component.form.setValue({
        term: defaultEmptyString,
        limit: defaultInvalidValue,
      });
      expect(component.form.invalid).toBeTrue();
    });

    it('deve ser válido com valores corretos', () => {
      component.form.setValue({
        term: mockGifBackendResponse[0].title,
        limit: defaultGifDataLimit,
      });
      expect(component.form.valid).toBeTrue();
    });
  });

  describe('submit()', () => {
    it('não deve chamar o serviço se o formulário for inválido', async () => {
      component.form.setValue({
        term: defaultEmptyString,
        limit: defaultInvalidValue,
      });
      await component.submit();
      expect(gifServiceSpy.searchGifs).not.toHaveBeenCalled();
    });

    it('deve chamar o serviço com valores padrão se limite for vazio', fakeAsync(async () => {
      component.form.setValue({
        term: mockGifBackendResponse[1].title,
        limit: defaultInvalidValue,
      });
      gifServiceSpy.searchGifs.and.returnValue(
        Promise.resolve(mockGifBackendResponse)
      );

      await component.submit();
      tick();
      expect(gifServiceSpy.searchGifs).toHaveBeenCalledWith(
        mockGifBackendResponse[1].title,
        defaultGifDataLimit
      );
    }));

    it('deve tratar erro ao chamar o serviço', fakeAsync(async () => {
      const error = new Error('Erro de API');
      spyOn(console, 'error');
      component.form.setValue({
        term: mockGifBackendResponse[1].title,
        limit: defaultGifDataLimit,
      });
      gifServiceSpy.searchGifs.and.returnValue(Promise.reject(error));

      await component.submit();
      tick();
      expect(console.error).toHaveBeenCalledWith(
        'Ocorreu um erro durante a busca :',
        error.message
      );
    }));
  });

  describe('handleResponse()', () => {
    it('deve transformar dados do backend em instâncias de Gif e emitir', () => {
      spyOn(component.dataEmitter, 'emit');
      const gifs = component.handleResponse(
        mockGifBackendResponse,
        mockGifBackendResponse[0].title
      );

      expect(gifs.length).toBe(1);
      expect(gifs[0]).toEqual(jasmine.any(Gif));
      expect(component.dataEmitter.emit).toHaveBeenCalledWith(gifs);
    });

    it('deve retornar lista vazia se lista for nula', () => {
      const result = component.handleResponse(
        null as any,
        mockGifBackendResponse[1].title
      );
      expect(result).toEqual([]);
    });
  });

  describe('ngOnDestroy()', () => {
    it('deve cancelar requisição ativa se houver', () => {
      component.abortController = new AbortController();
      spyOn(component.abortController, 'abort');

      component.ngOnDestroy();

      expect(component.abortController.abort).toHaveBeenCalled();
    });
  });
});
