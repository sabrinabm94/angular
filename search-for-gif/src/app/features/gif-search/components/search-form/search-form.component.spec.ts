import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { GifService } from '../../../../core/services/gif.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { GifBackend } from '../../../../data/models/gif-backend';
import { SEARCH_REQUEST_ERROR } from '../../../../data/const';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let gifServiceSpy: jasmine.SpyObj<GifService>;

  //constantes
  const defaultEmptyString = '';
  const defaultInvalidValue = null;
  const defaultGifDataLimitBig = 10;
  const defaultGifDataLimitSmall = 2;
  const searchTermOne: string = 'cat';
  const searchTermTwo: string = 'dog';

  const mockGifBackendResponse: GifBackend[] = [
    {
      id: '1',
      title: "sabrina's cat",
      alt_text: 'a cat',
      type: 'gif',
      images: {
        preview_gif: { url: 'http://preview.gif' },
        preview_webp: { url: 'http://preview.webp' },
        original: { webp: 'http://original1.webp' },
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
      imports: [
        ReactiveFormsModule,
        SearchFormComponent,
        TranslocoTestingModule.forRoot({ langs: { en: {} } }),
      ],
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
        term: searchTermOne,
        limit: defaultGifDataLimitSmall,
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
        term: searchTermTwo,
        limit: defaultInvalidValue,
      });
      gifServiceSpy.searchGifs.and.returnValue(
        Promise.resolve(mockGifBackendResponse)
      );

      await component.submit();
      tick();

      expect(gifServiceSpy.searchGifs).toHaveBeenCalledWith(
        searchTermTwo,
        defaultGifDataLimitBig
      );
    }));

    it('deve tratar erro ao chamar o serviço', fakeAsync(async () => {
      component.form.setValue({
        term: 'falha',
        limit: defaultGifDataLimitSmall,
      });

      const consoleErrorSpy = spyOn(console, 'error');
      gifServiceSpy.searchGifs.and.rejectWith(new Error('Erro de API'));

      await component.submit();
      tick();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        SEARCH_REQUEST_ERROR + ' :',
        'Erro de API'
      );
    }));
  });

  describe('handleResponse()', () => {
    it('deve transformar dados do backend em instâncias de Gif e emitir', () => {
      spyOn(component.dataEmitter, 'emit');

      const result = component.handleResponse(
        mockGifBackendResponse,
        searchTermOne
      );
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
      expect(component.dataEmitter.emit).toHaveBeenCalledWith(result);
    });
  });
});
