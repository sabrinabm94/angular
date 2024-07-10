import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { ResultsTemplateComponent } from '../../components/results-template/results-template.component';
import { SearchTemplateComponent } from '../../components/search-template/search-template.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Gif } from 'src/app/data/models/gif.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockResultsTemplateComponent {
  setData(data: any) {}
  // Mock necessary properties
  class = 'app-results-template';
  data = [];
  p = 1;
  handlePageChange() {}
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mockResultsTemplateComponent: MockResultsTemplateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderComponent,
        FooterComponent,
        ResultsTemplateComponent,
        SearchTemplateComponent,
        HomePageComponent // Import the standalone component here
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    mockResultsTemplateComponent = new MockResultsTemplateComponent() as any;
    component.resultsTemplateComponent = mockResultsTemplateComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngAfterViewInit and log the ResultsTemplateComponent', () => {
    const spy = spyOn(console, 'log');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith('ngAfterViewInit home page ', component.resultsTemplateComponent);
  });


  it('should log an error if ResultsTemplateComponent is not defined when calling setDataInChild', () => {
    const spy = spyOn(console, 'error');
    component.resultsTemplateComponent = undefined as any;
    component.setDataInChild({});

    expect(spy).toHaveBeenCalledWith('ResultsTemplateComponent is not defined');
  });
});
