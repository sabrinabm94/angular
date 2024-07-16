import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { Gif } from '../../../../data/models/gif.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { PictureComponent } from "../../../../shared/components/picture/picture.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [NgxPaginationModule, PictureComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the search term if gifs are provided', () => {
    const gifs: Gif[] = [
      { searchTerm: 'cat', id: '1', title: 'Cat GIF', alt: 'A cat', type: 'gif', previewGif: 'url1', previewWebp: 'url2' },
    ];
    component.setData(gifs);
    fixture.detectChanges();

    const searchTermElement = fixture.debugElement.query(By.css('.small-title'));
    expect(searchTermElement.nativeElement.textContent).toBe('cat');
  });

  it('should display the correct number of gifs per page', () => {
    const gifs: Gif[] = Array.from({ length: 12 }).map((_, i) => ({
      searchTerm: 'cat',
      id: `${i + 1}`,
      title: `Cat GIF ${i + 1}`,
      alt_text: `A cat ${i + 1}`,
      type: 'gif',
      previewGif: `url${i + 1}`,
      previewWebp: `url${i + 1}`
    }));
    component.setData(gifs);
    component.p = 1;
    fixture.detectChanges();

    const gifElements = fixture.debugElement.queryAll(By.css('.gif-image'));
    expect(gifElements.length).toBe(6);
  });

  it('should change page correctly', () => {
    const gifs: Gif[] = Array.from({ length: 12 }).map((_, i) => ({
      searchTerm: 'cat',
      id: `${i + 1}`,
      title: `Cat GIF ${i + 1}`,
      alt_text: `A cat ${i + 1}`,
      type: 'gif',
      previewGif: `url${i + 1}`,
      previewWebp: `url${i + 1}`
    }));
    component.setData(gifs);
    component.p = 2;
    fixture.detectChanges();

    const gifElements = fixture.debugElement.queryAll(By.css('.gif-image'));
    expect(gifElements.length).toBe(6);
    expect(gifElements[0].nativeElement.querySelector('figcaption').textContent).toBe('Cat GIF 7');
  });

  it('should handle page change event', () => {
    component.handlePageChange(2);
    expect(component.p).toBe(2);
  });
});
