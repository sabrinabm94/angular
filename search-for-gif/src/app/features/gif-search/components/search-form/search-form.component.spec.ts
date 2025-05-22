import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GifService } from '../../../../core/services/gif.service';
import { SearchFormComponent } from './search-form.component';
import { Gif } from '../../../../data/interfaces/gif.model';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let gifService: jasmine.SpyObj<GifService>;

  beforeEach(async () => {
    const gifServiceSpy = jasmine.createSpyObj('GifService', ['searchGifs']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchFormComponent],
      providers: [
        FormBuilder,
        { provide: GifService, useValue: gifServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    gifService = TestBed.inject(GifService) as jasmine.SpyObj<GifService>;
  });

  describe('Componente', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve criar o formulário ao iniciar o componente', () => {
      component.ngOnInit();
      expect(component.form).toBeTruthy();
      expect(component.form.get('term')).toBeTruthy();
      expect(component.form.get('limit')).toBeTruthy();
    });
  });

  describe('Formulário', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('não deve enviar o formulário caso o termo e o limite sejam inválidos', () => {
      component.form.setValue({ term: '', limit: null });
      spyOn(console, 'error');

      component.submit();

      expect(console.error).toHaveBeenCalledWith('Form is invalid');
      expect(gifService.searchGifs).not.toHaveBeenCalled();
    });

    it('deve realizar a busca de gifs caso os parâmetros do formulário sejam válidos', () => {
      const mockGifs: Gif[] = [];
      gifService.searchGifs.and.returnValue(Promise.resolve(mockGifs));

      component.form.setValue({ term: 'test', limit: 5 });
      component.submit();

      expect(gifService.searchGifs).toHaveBeenCalledWith('test', 5);
    });
  });

  describe('Retorno da busca', () => {
    it('deve tratar os resultados encontrados e os encaminhar para o componente pai', () => {
      spyOn(component.dataEmitter, 'emit');
      const mockGifs = [
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
      ];

      const processedGifs = component.handleResponse(mockGifs, 'test');

      expect(component.gifs.length).toBe(1);
      expect(component.gifs[0].id).toBe('1');
      expect(component.dataEmitter.emit).toHaveBeenCalledWith(component.gifs);
      expect(processedGifs).toBe(component.gifs);
    });

    it('deve apresentar uma listagem vazia em caso de não serem encontrados resultados', () => {
      spyOn(component.dataEmitter, 'emit');

      const processedGifs = component.handleResponse([], 'test');

      expect(component.gifs.length).toBe(0);
      expect(component.dataEmitter.emit).toHaveBeenCalledWith([]);
      expect(processedGifs).toBe(component.gifs);
    });
  });

  describe('Busca', () => {
    it('deve retornar uma mensagem em caso de erros na busca', async () => {
      gifService.searchGifs.and.returnValue(
        Promise.reject(new Error('Something went wrong'))
      );
      spyOn(console, 'error');

      component.form.setValue({ term: 'test', limit: 5 });
      await component.submit();

      expect(console.error).toHaveBeenCalledWith('Something went wrong');
    });

    it('deve cancelar a requisição de busca anterior caso uma nova seja iniciada', () => {
      const abortSpy = spyOn(
        AbortController.prototype,
        'abort'
      ).and.callThrough();

      component.form.setValue({ term: 'test', limit: 5 });
      component.submit(); // primeira chamada
      component.submit(); // segunda chamada

      expect(abortSpy).toHaveBeenCalledTimes(1); // cada nova chamada deve cancelar a anterior, evitando a concorrencia de requisições mal gerenciada
    });

    it('deve cancelar todas as requisições existentes', () => {
      const abortSpy = spyOn(
        AbortController.prototype,
        'abort'
      ).and.callThrough();

      component.ngOnDestroy();

      expect(abortSpy).toHaveBeenCalledTimes(1); // testa o cancelamento de requisições
    });
  });
});
