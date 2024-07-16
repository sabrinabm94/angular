import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { Gif } from '../../../../data/models/gif.model';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        SearchFormComponent,
        SearchResultsComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data in SearchResultsComponent', () => {
    const mockData: Gif[] = [
      new Gif('searchTerm', '1', 'Test GIF', 'Test Alt Text', 'gif', 'https://example.com/preview.gif', 'https://example.com/preview.webp')
    ];

    component.setDataInChild(mockData);

    expect(component.SearchResultsComponent).toBeDefined();
    expect(component.gifs).toEqual(mockData);
  });
});
