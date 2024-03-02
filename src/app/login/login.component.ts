import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserLogin } from '../interfaces/userLogin';
import { Router } from '@angular/router';
import { LoginEventService } from '../Services/LoginEventService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService,private router: Router,private loginEventService: LoginEventService) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const inputField = document.querySelector('.password') as HTMLInputElement;
    if (this.showPassword) {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  }

  login(): void {
    // Llama al método login del servicio de autenticación
    const credentials: UserLogin = { email: this.email, password: this.password };
    this.authService
      .login(credentials)
      .subscribe(
        () => {
          // Lógica adicional después del inicio de sesión exitoso
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
          this.loginEventService.emitLoginSuccessEvent();
        },
        (error) => {
          // Maneja cualquier error durante el inicio de sesión
          console.error('Error en el inicio de sesión:', error);
        }
      );
  }
}
