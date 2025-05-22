import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslocoService } from '@ngneat/transloco';
import { Language } from '../../data/interfaces/language.interface';

describe('LanguageService', () => {
  let service: LanguageService;
  let translocoServiceSpy: jasmine.SpyObj<TranslocoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslocoService', ['setActiveLang']);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslocoService, useValue: spy },
      ],
    });

    service = TestBed.inject(LanguageService);
    translocoServiceSpy = TestBed.inject(
      TranslocoService
    ) as jasmine.SpyObj<TranslocoService>;
  });

  describe('Dado que o usuário acessa a lista de idiomas disponíveis', () => {
    it('deve retornar a lista completa de idiomas suportados', () => {
      const languages = service.getLanguagesList();
      expect(languages.length).toBeGreaterThan(0);
      expect(languages).toEqual(service.languagesList);
    });
  });

  describe('Quando o usuário define um idioma válido como ativo', () => {
    it('deve atualizar o idioma atual e chamar o TranslocoService com as iniciais corretas', () => {
      const selectedLanguage: Language = service.languagesList[1]; // inglês

      const result = service.setActiveLanguage(selectedLanguage);

      expect(translocoServiceSpy.setActiveLang).toHaveBeenCalledWith(
        selectedLanguage.initials
      );
      expect(result).toBe(selectedLanguage);
      expect(service.getActiveLanguage()).toBe(selectedLanguage);
    });
  });

  describe('Quando o usuário tenta definir um idioma inválido ou incompleto', () => {
    it('não deve atualizar o idioma atual nem chamar o TranslocoService', () => {
      const result = service.setActiveLanguage({
        id: 999,
        name: 'Invalid',
        initials: '',
      });

      expect(translocoServiceSpy.setActiveLang).not.toHaveBeenCalled();
      expect(result).toBeNull();
      expect(service.getActiveLanguage()).toBeNull();
    });
  });

  describe('Dado que o usuário já definiu um idioma ativo', () => {
    it('deve retornar corretamente o idioma atual', () => {
      const language = service.languagesList[2]; // espanhol
      service.setActiveLanguage(language);

      const activeLanguage = service.getActiveLanguage();

      expect(activeLanguage).toBe(language);
    });
  });

  describe('Dado que nenhum idioma foi definido', () => {
    it('deve retornar null ao consultar o idioma ativo', () => {
      const activeLanguage = service.getActiveLanguage();

      expect(activeLanguage).toBeNull();
    });
  });
});
