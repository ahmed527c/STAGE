import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './Guards/admin.guard';

import { ContactComponent } from './Pages/contact/contact.component';
import { PanierComponent } from './Pages/panier/panier.component';
import { ProduitsComponent } from './Pages/produits/produits.component';
import { ServicesComponent } from './Pages/services/services.component';
import { AccueilComponent } from './Pages/Accueil/accueil.component';
import { Espace_adminComponent } from './Pages/Espace admin/Espace_admin.component';
import { Admin_notificationComponent } from './Pages/Admin-notification/Admin-notification.component';
import { AuthGuard } from './Guards/auth-guard.guard';
import { LoginComponent } from './Authentification_pages/login/login.component';
import { RegisterComponent } from './Authentification_pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'accueil', component: AccueilComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'panier', component: PanierComponent  ,canActivate: [AuthGuard]},
  
  {
    path: 'Espace_Admin',
    component: Espace_adminComponent,
    canActivate: [AdminGuard]
  },

  { path: 'Admin_notification', component:Admin_notificationComponent 
    ,canActivate: [AdminGuard]
  },


  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
