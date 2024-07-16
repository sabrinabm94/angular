import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SearchFormComponent } from './search-form.component';
import { GifService } from '../../../../core/services/gif.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let mockGifService: any; // Substitua 'any' pela definição correta do mock do GifService

  beforeEach(async () => {
    // Criando o mock do serviço
    mockGifService = jasmine.createSpyObj('GifService', ['searchGifs']);

    await TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: GifService, useValue: mockGifService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form correctly', () => {
    // Simulando dados de resposta do serviço
    const mockResponse = [
      {
        id: '1',
        title: 'Test GIF',
        alt_text: 'Test Alt Text',
        type: 'gif',
        images: {
          preview_gif: { url: 'https://example.com/preview.gif' },
          preview_webp: { url: 'https://example.com/preview.webp' }
        }
      }
    ];

    // Configurando o retorno do serviço mockado
    mockGifService.searchGifs.and.returnValue(of(mockResponse));

    // Preenchendo valores do formulário
    component.form.patchValue({
      term: 'test',
      limit: 5
    });

    // Simulando a submissão do formulário
    component.submit();

    // Verificando se o serviço foi chamado corretamente
    expect(mockGifService.searchGifs).toHaveBeenCalledWith('test', 5);

    // Verificando se a função verifyResponse foi chamada corretamente
    expect(component.gifs.length).toBe(1);
    expect(component.gifs[0].searchTerm).toBe('test');
    expect(component.gifs[0].id).toBe('1');
    // Continuar com outras expectativas conforme necessário para os dados do GIF

    // Verificando se os dados foram emitidos corretamente pelo EventEmitter
    expect(component.dataEmitter.emit).toHaveBeenCalledWith(component.gifs);
  });

  // Adicionar mais testes conforme necessário para cobrir outros cenários e validações do formulário
});
