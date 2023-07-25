import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';
import { UsersComponent } from './views/users/users.component';
import { CategoryComponent } from './views/category/category.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { LinkComponent } from './components/link/link.component';
import { RouteLinkComponent } from './components/route-link/route-link.component';
import { HeadComponent } from './components/head/head.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    UsersComponent,
    CategoryComponent,
    CategoriesComponent,
    CheckoutComponent,
    HeaderComponent,
    FooterComponent,
    LinkComponent,
    RouteLinkComponent,
    HeadComponent,
    ImageComponent,
    BackgroundImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
