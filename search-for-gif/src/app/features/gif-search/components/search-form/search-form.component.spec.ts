import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { GifService } from '../../../../core/services/gif.service';
import { Gif } from '../../../../data/models/gif.model';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let gifService: jasmine.SpyObj<GifService>;

  beforeEach(async () => {
    gifService = jasmine.createSpyObj('GifService', ['searchGifs']);

    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [ReactiveFormsModule, CommonModule],
      providers: [{ provide: GifService, useValue: gifService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('term')?.value).toEqual('');
    expect(component.form.get('limit')?.value).toBeNull();
  });

  it('should mark term field as invalid if it is empty', () => {
    const termControl = component.form.get('term');
    termControl?.setValue('');
    termControl?.markAsDirty();

    expect(termControl?.invalid).toBeTruthy();
    expect(termControl?.errors?.['required']).toBeTruthy();
  });

  it('should mark term field as valid if it has a value', () => {
    const termControl = component.form.get('term');
    termControl?.setValue('cat');

    expect(termControl?.valid).toBeTruthy();
  });

  it('should call gifService.searchGifs when form is submitted with valid data', () => {
    const term = 'cat';
    const limit = 5;
    component.form.patchValue({ term, limit });
    component.submit();

    expect(gifService.searchGifs).toHaveBeenCalledWith(term, limit);
  });

  it('should emit gifs through dataEmitter when search results are received', () => {
    const gifs: Gif[] = [
      { searchTerm: 'cat', id: '1', title: 'Cat GIF', alt_text: 'A cat', type: 'gif', previewGif: 'url1', previewWebp: 'url2' },
    ];
    gifService.searchGifs.and.returnValue(of(gifs));

    spyOn(component.dataEmitter, 'emit');

    const term = 'cat';
    const limit = 5;
    component.form.patchValue({ term, limit });
    component.submit();

    expect(component.dataEmitter.emit).toHaveBeenCalledWith(gifs);
  });

  it('should log an error if no gifs are found', () => {
    gifService.searchGifs.and.returnValue(of([]));
    spyOn(console, 'error');

    const term = 'dog'; // Assuming no results for 'dog'
    const limit = 5;
    component.form.patchValue({ term, limit });
    component.submit();

    expect(console.error).toHaveBeenCalledWith('No gifs found.');
  });

  it('should log an error if there is an error fetching gifs', () => {
    const errorMessage = 'Internal Server Error';
    gifService.searchGifs.and.throwError(errorMessage);
    spyOn(console, 'error');

    const term = 'cat';
    const limit = 5;
    component.form.patchValue({ term, limit });
    component.submit();

    expect(console.error).toHaveBeenCalledWith(`Error fetching gifs: ${errorMessage}`);
  });
});
