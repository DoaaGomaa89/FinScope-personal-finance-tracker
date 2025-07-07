import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';;
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=[A-Z])(?=.*\W).+$/)
      ]]
    });
  }

  onLogin(){
    if(this.loginForm.invalid) return;

  const {email, password} = this.loginForm.value;

  this.authService.login({email,password}).subscribe({
    next: (res) => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('userEmail',res.email);
      localStorage.setItem('roles',JSON.stringify(res.roles));
     
      const roles = res.roles;
      if(roles.includes('ADMIN')){
        console.log("Navigation to admin dashboard")
        this.router.navigate(['/admin/dashboard']);
      }else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Login failed. please try again.!!'
    }
  });
}
}
