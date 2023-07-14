import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { FetchComponent } from './pages/fetch/fetch.component';
import { SavedComponent } from './pages/saved/saved.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SigninComponent } from './pages/signin/signin.component';
import { Signin2Component } from './pages/signin2/signin2.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FetchComponent,
    SavedComponent,
    NavComponent,
    CardPokemonComponent,
    SigninComponent,
    Signin2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
