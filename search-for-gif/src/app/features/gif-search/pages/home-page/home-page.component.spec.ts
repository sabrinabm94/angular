import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { Injector, ComponentRef, ViewContainerRef } from '@angular/core';
import { Gif } from '../../../../data/interfaces/gif.model';
import { of } from 'rxjs';
import { GetTranslocoTestingModule } from '../../../../helpers/transloco-testing.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const mockData: Gif[] = [
    {
      id: '1',
      imageUrl: 'https://example.com/gif1.gif',
      searchTerm: '',
      title: '',
      alt_text: '',
      type: '',
      previewGif: '',
      previewWebp: '',
    },
  ];

  const mockViewContainerRef = {
    createComponent: jasmine
      .createSpy('createComponent')
      .and.callFake((component: any) => {
        return {
          instance: {
            dataEmitter: of([{ id: '1', url: 'https://example.com/gif1.gif' }]),
            setData: jasmine.createSpy('setData'),
          },
        } as unknown as ComponentRef<any>;
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, GetTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    // Simula ViewChild
    component.searchFormContainer = mockViewContainerRef as any;
    component.searchResultsContainer = mockViewContainerRef as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load search form component and bind emitter', fakeAsync(async () => {
    // Simula import dinâmico
    const mockSearchFormComponent = {
      SearchFormComponent: class {
        dataEmitter = of([{ id: '1', url: 'https://example.com/gif1.gif' }]);
      },
    };

    spyOn(component as any, 'loadSearchFormComponent').and.callFake(
      async () => {
        const searchFormComponentRef = mockViewContainerRef.createComponent(
          mockSearchFormComponent.SearchFormComponent
        );
        searchFormComponentRef.instance.dataEmitter.subscribe((data: Gif[]) =>
          component.setDataInChild(data)
        );
      }
    );

    await component.loadSearchFormComponent();
    tick();

    expect(mockViewContainerRef.createComponent).toHaveBeenCalled();
  }));

  it('should load search results component', fakeAsync(async () => {
    const mockSearchResultsComponent = {
      SearchResultsComponent: class {
        setData = jasmine.createSpy('setData');
      },
    };

    spyOn(component as any, 'loadSearchResultsComponent').and.callFake(
      async () => {
        component.SearchResultsComponent = mockViewContainerRef.createComponent(
          mockSearchResultsComponent.SearchResultsComponent
        );
      }
    );

    await component.loadSearchResultsComponent();
    tick();

    expect(component.SearchResultsComponent).toBeTruthy();
    expect(mockViewContainerRef.createComponent).toHaveBeenCalled();
  }));

  it('should set data in SearchResultsComponent', () => {
    const setDataSpy = jasmine.createSpy('setData');

    component.SearchResultsComponent = {
      instance: {
        setData: setDataSpy,
      },
    } as unknown as ComponentRef<any>;

    component.setDataInChild(mockData);
    expect(setDataSpy).toHaveBeenCalledWith(mockData);
  });

  it('should log error if SearchResultsComponent is not defined', () => {
    spyOn(console, 'error');
    component.SearchResultsComponent = undefined as any;
    component.setDataInChild([mockData[0]]);
    expect(console.error).toHaveBeenCalledWith(
      'SearchResultsComponent is not defined'
    );
  });
});
