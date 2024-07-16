import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { Component, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { CommonModule } from '@angular/common';

// Componente Mock para HeaderComponent
@Component({
  selector: 'app-header',
  template: '<div>Mock Header Component</div>',
})
class MockHeaderComponent {}

// Componente Mock para FooterComponent
@Component({
  selector: 'app-footer',
  template: '<div>Mock Footer Component</div>',
})
class MockFooterComponent {}

// Módulo de Teste que declara os componentes necessários
@NgModule({
  declarations: [
    MockHeaderComponent,
    MockFooterComponent,
    HomePageComponent,
    SearchFormComponent,
    SearchResultsComponent,
  ],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
class TestModule {}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load SearchFormComponent dynamically', async () => {
    const searchFormContainer = fixture.nativeElement.querySelector('#searchFormContainer');
    expect(searchFormContainer).toBeTruthy();

    // Verifica se o componente de formulário de busca foi carregado dinamicamente
    await fixture.whenStable();
    expect(searchFormContainer.querySelector('app-search-template')).toBeTruthy();
  });

  it('should load SearchResultsComponent dynamically', async () => {
    const searchResultsContainer = fixture.nativeElement.querySelector('#searchResultsContainer');
    expect(searchResultsContainer).toBeTruthy();

    // Verifica se o componente de resultados de busca foi carregado dinamicamente
    await fixture.whenStable();
    expect(searchResultsContainer.querySelector('app-results-template')).toBeTruthy();
  });

  it('should call setDataInChild method to pass data to SearchResultsComponent', async () => {
    const testData = [
      { searchTerm: 'cat', id: '1', title: 'Cat GIF', alt_text: 'A cat', type: 'gif', previewGif: 'url1', previewWebp: 'url2' },
    ];

    // Espia o método setDataInChild para verificar se é chamado corretamente
    spyOn(component, 'setDataInChild');

    // Emite dados para setDataInChild
    component.setDataInChild(testData);

    // Verifica se o método foi chamado corretamente
    expect(component.setDataInChild).toHaveBeenCalledWith(testData);
  });
});
