import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { ViewTransactionsComponent } from './pages/view-transactions/view-transactions.component';
import { ExportTransactionsComponent } from './pages/export-transactions/export-transactions.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashbaordComponent } from './pages/admin/admin-dashbaord/admin-dashbaord.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { RestPasswordComponent } from './pages/rest-password/rest-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-transaction', component: AddTransactionComponent },
      { path: 'view-transactions', component: ViewTransactionsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'budget', component: BudgetComponent },
      { path: 'export', component: ExportTransactionsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'reset-password', component: RestPasswordComponent },
    ]
  },

  {
    path:'admin',
    component: AdminLayoutComponent,

    children: [
      {path: 'dashboard', component: AdminDashbaordComponent},
      {path: 'manage-users', component: ManageUsersComponent},
      // {path: 'users', component:}
    ]
  },

  { path: '**', redirectTo: 'login' }
];



    // {path: 'profile',component:UserProfileComponent},
    // {path:'dashboard',component:DashboardComponent},
    // {path:'transactions',component:TransactionsComponent},
    // {path:'accounts',component:AccountsComponent},
