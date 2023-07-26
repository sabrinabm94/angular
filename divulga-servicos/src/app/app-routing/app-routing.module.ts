import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../views/pages/home/home.component';
import { ContactComponent } from '../views/pages/contact/contact.component';
import { RegisterComponent } from '../views/pages/register/register.component';
import { LoginComponent } from '../views/pages/login/login.component';
import { UserComponent } from '../views/pages/user/user.component';
import { UsersComponent } from '../views/pages/users/users.component';
import { CategoryComponent } from '../views/pages/category/category.component';
import { CategoriesComponent } from '../views/pages/categories/categories.component';
import { CheckoutComponent } from '../views/pages/checkout/checkout.component';
import { ProfessionalComponent } from '../views/pages/professional/professional.component';

const appRoutes: Routes = [
  { path: '*', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'user/:slug', component: UserComponent }, //logged
  { path: 'usuario/:slug', component: UserComponent }, //logged
  { path: 'users', component: UsersComponent }, //admin
  { path: 'usuarios', component: UsersComponent }, //admin
  { path: 'category/:slug', component: CategoryComponent },
  { path: 'categoria/:slug', component: CategoryComponent },
  { path: 'professional/:slug', component: ProfessionalComponent },
  { path: 'profissional/:slug', component: ProfessionalComponent },
  { path: 'company/:slug', component: ProfessionalComponent },
  { path: 'empresa/:slug', component: ProfessionalComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent }, //logged
  { path: 'pagamento', component: CheckoutComponent }, //logged
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
