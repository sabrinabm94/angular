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
import { FooterComponent } from './components/footer/footer.component';
import { LinkComponent } from './components/link/link.component';
import { RouteLinkComponent } from './components/route-link/route-link.component';
import { HeadComponent } from './components/head/head.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';

import { CategoryTemplateComponent } from './views/templates/category-template/category-template.component';

import { HomeComponent } from './views/pages/home/home.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LoginComponent } from './views/pages/login/login.component';
import { UserComponent } from './views/pages/user/user.component';
import { UsersComponent } from './views/pages/users/users.component';
import { CategoryComponent } from './views/pages/category/category.component';
import { CategoriesComponent } from './views/pages/categories/categories.component';
import { CheckoutComponent } from './views/pages/checkout/checkout.component';
import { ProfessionalTemplateComponent } from './views/templates/professional-template/professional-template.component';
import { ProfessionalComponent } from './views/pages/professional/professional.component';
import { ButtonComponent } from './components/button/button.component';


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
    CategoryTemplateComponent,
    ProfessionalTemplateComponent,
    ProfessionalComponent,
    ButtonComponent,
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
