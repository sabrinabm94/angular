import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Mock do GifService (se necessário)
import { of } from 'rxjs';
import { GifService } from './core/services/gif.service';

class MockGifService {
  searchGifs() {
    // Mock do método que você espera chamar
    return of([]);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        HomePageComponent,
        HttpClientTestingModule, // Adicionando o HttpClientTestingModule
      ],
      providers: [
        { provide: GifService, useClass: MockGifService }, // Fornecendo um mock do GifService se necessário
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('search-for-gif');
  });

  it('should render the HomePageComponent', () => {
    const homePageElement = fixture.debugElement.query(By.directive(HomePageComponent));
    expect(homePageElement).toBeTruthy();
  });
});
