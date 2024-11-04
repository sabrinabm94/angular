import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomePageComponent } from './features/gif-search/pages/home-page/home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HomePageComponent,
        RouterLink,
        RouterLinkActive,
        RouterOutlet
      ],
      declarations: [AppComponent]
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

  it('should have as title "tdah-mais-foco"', () => {
    expect(component.title).toEqual('tdah-mais-foco');
  });

  it('should render HomePageComponent', () => {
    const homePageComponent = fixture.debugElement.query(By.directive(HomePageComponent));
    expect(homePageComponent).toBeTruthy();
  });
});
