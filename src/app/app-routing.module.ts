import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FetchComponent } from './pages/fetch/fetch.component';
import { SavedComponent } from './pages/saved/saved.component';
import { authGuard } from './auth.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { Signin2Component } from './pages/signin2/signin2.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign', component: SigninComponent },
  { path: 'signin2', component: Signin2Component },
  { path: 'fetch', component: FetchComponent, canActivate: [authGuard] },
  { path: 'saved', component: SavedComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
