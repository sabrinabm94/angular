import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withDebugTracing, withRouterConfig } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './src/app/views/contact/contact.component';
import { RegisterComponent } from './src/app/views/register/register.component';
import { LoginComponent } from './src/app/views/login/login.component';
import { UserComponent } from './src/app/views/user/user.component';
import { UsersComponent } from './src/app/views/users/users.component';
import { CategoryComponent } from './src/app/views/category/category.component';
import { CategoriesComponent } from './src/app/views/categories/categories.component';
import { CheckoutComponent } from './src/app/views/checkout/checkout.component';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: '/', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user:slug', component: UserComponent }, //logged
  { path: 'users', component: UsersComponent }, //admin
  { path: 'category:slug', component: CategoryComponent },
  { path: 'categories', component: CategoriesComponent }, //admin
  { path: 'checkout', component: CheckoutComponent }, //logged
];

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routes,
        withDebugTracing(),
        withRouterConfig({paramsInheritanceStrategy: 'always'}))
    ]
  }
);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MatFormFieldModule]
})
export class AppRoutingModule { }

