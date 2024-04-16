import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginEventService } from 'src/app/Services/LoginEventService';
import { UserLogin } from 'src/app/interfaces/userLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean = false;
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService,private router: Router,private loginEventService: LoginEventService, private fb: FormBuilder) {}

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
    const credentials: UserLogin = this.form.getRawValue();
    this.authService.login(credentials).subscribe(() => {
          this.router.navigate(['/alert']);
          this.loginEventService.emitLoginSuccessEvent();
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
  }
}
