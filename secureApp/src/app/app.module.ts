// app.module.ts
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { ProduitsComponent } from './Pages/produits/produits.component';
import { ServicesComponent } from './Pages/services/services.component';
import { PanierComponent } from './Pages/panier/panier.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackgroundSwitcherComponent } from './Pages/Accueil/Background_VID-IMG/background-switcher.component';
import { AccueilComponent } from './Pages/Accueil/accueil.component';
import { Espace_adminComponent } from './Pages/Espace admin/Espace_admin.component';
import { Admin_notificationComponent } from './Pages/Admin-notification/Admin-notification.component';
import { LoginComponent } from './Authentification_pages/login/login.component';
import { RegisterComponent } from './Authentification_pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    BackgroundSwitcherComponent,
    ProduitsComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    Espace_adminComponent,
    Admin_notificationComponent,
    PanierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
