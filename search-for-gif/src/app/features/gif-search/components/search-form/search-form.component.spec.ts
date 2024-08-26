import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GifService } from '../../../../core/services/gif.service';
import { SearchFormComponent } from './search-form.component';
import { Gif } from '../../../../data/models/gif.model';

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
        { provide: GifService, useValue: gifServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    gifService = TestBed.inject(GifService) as jasmine.SpyObj<GifService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form', () => {
      component.ngOnInit();
      expect(component.form).toBeTruthy();
      expect(component.form.get('term')).toBeTruthy();
      expect(component.form.get('limit')).toBeTruthy();
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should not submit if the form is invalid', () => {
      component.form.setValue({ term: '', limit: null });
      spyOn(console, 'error');

      component.submit();

      expect(console.error).toHaveBeenCalledWith('Form is invalid');
      expect(gifService.searchGifs).not.toHaveBeenCalled();
    });

    it('should abort the previous request if one is ongoing', () => {
      const abortSpy = spyOn(AbortController.prototype, 'abort').and.callThrough();

      component.form.setValue({ term: 'test', limit: 5 });
      component.submit(); // First call
      component.submit(); // Second call, should abort the first

      expect(abortSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the GifService with correct parameters when form is valid', () => {
      const mockGifs: Gif[] = [];
      gifService.searchGifs.and.returnValue(Promise.resolve(mockGifs));

      component.form.setValue({ term: 'test', limit: 5 });
      component.submit();

      expect(gifService.searchGifs).toHaveBeenCalledWith('test', 5);
    });

    it('should handle errors from the GifService', async () => {
      gifService.searchGifs.and.returnValue(Promise.reject(new Error('Something went wrong')));
      spyOn(console, 'error');

      component.form.setValue({ term: 'test', limit: 5 });
      await component.submit();

      expect(console.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  describe('handleResponse', () => {
    it('should process the response and emit the GIFs', () => {
      spyOn(component.dataEmitter, 'emit');
      const mockGifs = [{
        id: '1',
        title: 'Gif Title 1',
        alt_text: 'Gif Alt Text 1',
        type: 'gif',
        images: {
          preview_gif: { url: 'https://example.com/gif1.gif' },
          preview_webp: { url: 'https://example.com/gif1.webp' },
        },
      }];

      const processedGifs = component.handleResponse(mockGifs, 'test');

      expect(component.gifs.length).toBe(1);
      expect(component.gifs[0].id).toBe('1');
      expect(component.dataEmitter.emit).toHaveBeenCalledWith(component.gifs);
      expect(processedGifs).toBe(component.gifs);
    });

    it('should return an empty array if no data is returned', () => {
      spyOn(component.dataEmitter, 'emit');

      const processedGifs = component.handleResponse([], 'test');

      expect(component.gifs.length).toBe(0);
      expect(component.dataEmitter.emit).toHaveBeenCalledWith([]);
      expect(processedGifs).toBe(component.gifs);
    });
  });

  describe('ngOnDestroy', () => {
    it('should abort any ongoing request', () => {
      const abortSpy = spyOn(AbortController.prototype, 'abort').and.callThrough();

      component.ngOnDestroy();

      expect(abortSpy).toHaveBeenCalledTimes(1);
    });
  });
});
