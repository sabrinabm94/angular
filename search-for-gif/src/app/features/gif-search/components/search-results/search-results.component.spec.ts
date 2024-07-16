import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { PictureComponent } from '../../../../shared/components/picture/picture.component';
import { FormsModule } from '@angular/forms';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent, PictureComponent ],
      imports: [ CommonModule, FormsModule ] // Importe quaisquer módulos necessários para os testes aqui
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display results correctly when gifs are provided', () => {
    const mockGifs = [
      {
        id: '1',
        title: 'Test GIF 1',
        alt_text: 'Test Alt 1',
        type: 'Gif',
        previewGif: 'https://example.com/preview1.gif',
        previewWebp: 'https://example.com/preview1.webp',
        searchTerm: 'test term 1'
      },
      {
        id: '2',
        title: 'Test GIF 2',
        alt_text: 'Test Alt 2',
        type: 'Gif',
        previewGif: 'https://example.com/preview2.gif',
        previewWebp: 'https://example.com/preview2.webp',
        searchTerm: 'test term 2'
      }
    ];

    component.setData(mockGifs);
    fixture.detectChanges();

    const resultsSection = fixture.nativeElement.querySelector('.results');
    expect(resultsSection).toBeTruthy();

    const gifsElements = fixture.nativeElement.querySelectorAll('.gif-image');
    expect(gifsElements.length).toBe(mockGifs.length);

    const searchTermElement = fixture.nativeElement.querySelector('.big-title .small-title');
    expect(searchTermElement.textContent).toContain(mockGifs[0].searchTerm); // Assuming gifs[0] exists
  });

  it('should handle page change correctly', () => {
    const pageNumber = 3;
    component.handlePageChange(pageNumber);
    expect(component.p).toBe(pageNumber);
  });
});
