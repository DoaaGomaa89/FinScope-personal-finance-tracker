import { Component } from '@angular/core';
import { FormGroup,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  profileForm!:FormGroup;
  Message: string ='';

  constructor(private fb: FormBuilder,private userService: UserService,private router:Router){ 
  }

  ngOnInit():void{
    this.profileForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateofBirth: ['',[Validators.required]]
    });

    this.userService.getUserProfile().subscribe({
      next: (data) => {
        
        if(data && (data.fistname || data.lastName || data.phone || data.dateofBirth ||data.gender)) {
          const dob = data.dateofBirth ? data.dateofBirth.split('T')[0] : '';
          this.profileForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            phone: data.phone,
            dateofBirth: dob
          });
        }
      },

      error: (error) => {
        console.error('Error fetching profile', error);
        this.Message = '❌ Failed to load profile data.';
      }
    });
  }

  onSubmit(){
    if(this.profileForm.invalid){
      this.profileForm.markAllAsTouched();
      console.log("Invalid profileform")
      return;
    }

    this.userService.userProfile(this.profileForm.value).subscribe({
      next:  () => {
        this.Message = "Profile Completed sucessfully!!";
        console.log("Profile completed");
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error:(error) => {
        console.error('ERROR:', error);
        this.Message = '❌ Failed to complete profile. Please try again.';
      }
    });
  }
}
