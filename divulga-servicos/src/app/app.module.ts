import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './src/app/views/contact/contact.component';
import { RegisterComponent } from './src/app/views/register/register.component';
import { LoginComponent } from './src/app/views/login/login.component';
import { UserComponent } from './src/app/views/user/user.component';
import { UsersComponent } from './src/app/views/users/users.component';
import { CategoryComponent } from './src/app/views/category/category.component';
import { CategoriesComponent } from './src/app/views/categories/categories.component';
import { CheckoutComponent } from './src/app/views/checkout/checkout.component';

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
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
  ],
  exports: [NgModule, MatFormField],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
