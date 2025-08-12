import { Component } from '@angular/core';
import { AuthService } from '../../SERVICES/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
      styleUrls: ['./register.component.css']

})
export class RegisterComponent {
  nom = '';
  email = '';
  password = '';
  erreur = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.erreur = '';
    this.success = '';

    this.auth.register(this.nom, this.email, this.password).subscribe({
      next: () => {
        this.success = 'Inscription réussie !';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.erreur = err.error || 'Erreur lors de l’inscription';
      }
    });
  }
}
