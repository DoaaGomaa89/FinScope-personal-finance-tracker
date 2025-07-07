import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestpasswordService } from '../../services/restpassword.service';
import { CommonModule } from '@angular/common';
import { validateHeaderName } from 'node:http';

@Component({
  selector: 'app-rest-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './rest-password.component.html',
  styleUrl: './rest-password.component.css'
})
export class RestPasswordComponent {

  resetForm: FormGroup;
  otpSent = false;
  otpVerified = false;
  message = '';
  showReset = false;
  hideOtpSection = false;

  constructor(private fb: FormBuilder, private resetService: RestpasswordService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/)]],
      confirmPassword: ['',[Validators.required]]
    });
  }

  sendOtp() {
    const email = this.resetForm.value.email;
    this.resetService.sendOtp(email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.otpSent = true;
      },
      error: () => {
        this.message = '❌ Failed to send OTP';
      }
    });
  }

  verifyOtp() {
    const {email, otp} = this.resetForm.value;
    this.resetService.verifyOtp(email, otp).subscribe({
      next: (res) => {
        this.message = res.message;
        this.otpVerified = true;
      },

      error: () => {
        this.message = '❌ Invalid or expired OTP';
      }
    });
  }

 resetPassword() {
  const { email, otp, newPassword, confirmPassword } = this.resetForm.value;

  if (newPassword !== confirmPassword) {
    this.message = '❌ Passwords do not match';
    return;
  }

  this.resetService.resetPassword(email, otp, newPassword).subscribe({
    next: (res) => {
      console.log("RestPassword: ",res);
      this.message = res.message;
      this.otpSent = false; 
      this.resetForm.reset(); 
    },
    error: (err) => {
      this.message = '❌ ' + (err.error.message || 'Failed to reset password');
    }
  });
}

}
