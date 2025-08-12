import { Component } from '@angular/core';
import { AuthService, Utilisateur } from '../../SERVICES/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent {
  email = '';
  password = '';
  erreur = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  this.auth.login(this.email, this.password).subscribe({
    next: () => {
      const user = this.auth.getUtilisateurConnecte();
      if (user) {
        if (user.role === 'admin') {
          this.router.navigate(['/admin-panel']);
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.erreur = 'Échec de récupération des données utilisateur.';
      }
    },
    error: (err) => {
      this.erreur = err.message || 'Échec de connexion.';
    }
  });
}

}
