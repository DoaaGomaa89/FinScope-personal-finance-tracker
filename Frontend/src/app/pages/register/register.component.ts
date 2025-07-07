import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  errorMessage:string='';

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router){
    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['' ,[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/)]],
      confirmPassword: ['',Validators.required]
    },{Validators: this.matchPasswords});
  }

  matchPasswords(formGroup:FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  onSubmit(){
    if(this.registerForm.invalid) return;

    const {email,password} = this.registerForm.value;
    this.authService.register({email,password}).subscribe({
      next: (response: any) => {
        alert('Registration successful! Please complete your profile.');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile'])
      },
      error: err => this.errorMessage = err.error?.message || 'Registration failed'
    });
  }
}
