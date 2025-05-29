import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { PictureComponent } from '../../../../shared/components/picture/picture.component';
import { Gif } from '../../../../data/interfaces/gif.model';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NgxPaginationModule, SearchResultsComponent, PictureComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set class binding correctly', () => {
    expect(component.class).toBe('app-results-template');
  });

  it('should have an empty gifs array by default', () => {
    expect(component.gifs.length).toBe(0);
  });

  it('should update gifs and reset page number when setData is called', () => {
    const mockGifs: Gif[] = [
      new Gif(
        'searchTerm',
        'id1',
        'title1',
        'alt1',
        'type1',
        'url1',
        'urlPreview1',
        'imageUrl1'
      ),
      new Gif(
        'searchTerm',
        'id2',
        'title2',
        'alt2',
        'type2',
        'url2',
        'urlPreview2',
        'imageUrl2'
      ),
    ];

    component.setData(mockGifs);

    expect(component.gifs).toEqual(mockGifs);
    expect(component.currentPageNumber).toBe(1);
  });

  it('should change currentPageNumber when handlePageChange is called', () => {
    const pageNumber = 2;
    component.handlePageChange(pageNumber);

    expect(component.currentPageNumber).toBe(pageNumber);
  });
});
