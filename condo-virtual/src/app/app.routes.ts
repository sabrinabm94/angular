import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MonthlySummaryComponent } from './features/expenses/monthly-summary/monthly-summary.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { UsageComponent } from './features/dashboard/usage/usage.component';
import { ExpenseFormComponent } from './features/expenses/expense-form/expense-form.component';
import { UnitFormComponent } from './features/units/unit-form/unit-form.component';
import { UnitSummaryComponent } from './features/units/unit-summary/unit-summary.component';
import { ProfileComponent } from './features/auth/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'usage', component: UsageComponent },
  { path: 'add-expense', component: ExpenseFormComponent },
  { path: 'report/:id', component: MonthlySummaryComponent },
  { path: 'add-unit', component: UnitFormComponent },
  { path: 'report-unit/:id', component: UnitSummaryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];
