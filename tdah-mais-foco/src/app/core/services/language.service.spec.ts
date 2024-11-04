import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let mockTranslocoService: jasmine.SpyObj<TranslocoService>;

  beforeEach(() => {
    // Criando um mock para TranslocoService
    mockTranslocoService = jasmine.createSpyObj('TranslocoService', ['setActiveLang']);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslocoService, useValue: mockTranslocoService }
      ]
    });

    // Obtendo uma instância do serviço
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch language using TranslocoService', () => {
    const language = 'en';

    // Chama o método switchLanguage do serviço
    service.switchLanguage(language);

    // Verifica se o método setActiveLang foi chamado com o idioma correto
    expect(mockTranslocoService.setActiveLang).toHaveBeenCalledWith(language);
  });
});
