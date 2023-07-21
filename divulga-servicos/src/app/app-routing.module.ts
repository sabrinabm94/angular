import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';
import { UsersComponent } from './views/users/users.component';
import { CategoryComponent } from './views/category/category.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { CheckoutComponent } from './views/checkout/checkout.component';

const routes: Routes = [
  { path: '/', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'user/:slug', component: UserComponent }, //logged
  { path: 'usuario/:slug', component: UserComponent }, //logged
  { path: 'profissional/:slug', component: UserComponent },
  { path: 'users', component: UsersComponent }, //admin
  { path: 'usuarios', component: UsersComponent }, //admin
  { path: 'category/:slug', component: CategoryComponent },
  { path: 'categoria/:slug', component: CategoryComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent }, //logged
  { path: 'pagamento', component: CheckoutComponent }, //logged
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
