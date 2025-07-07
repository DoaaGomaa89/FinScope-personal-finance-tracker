import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  firstName: string = '';
  showDropDown = false;
  isAdminLoggedInAsUser = false;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const isImpersonating = localStorage.getItem('impersonateAsUser');
    if (isImpersonating) {
      this.isAdminLoggedInAsUser = true;
    }

    this.service.getUserProfile().subscribe({
      next: (data) => { this.firstName = data.firstName; },
      error: (err) => { console.error("Failed to fetch profile data", err); }
    });
  }
}


  toggleDropDown() {
    this.showDropDown = !this.showDropDown
  }

logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}


}