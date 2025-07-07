import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
 adminName: string = '';
  
  showDropDown: boolean = false;

  constructor(private router: Router, private service:UserService) {}

  ngOnInit():void{
    this.service.getUserProfile().subscribe({
      next: (data) => {this.adminName = data.firstName || "Admin";},
      error: (err) => {console.error("Failed to load admin data",err);}
    })
  }
  toggleDropDown(): void {
    this.showDropDown = !this.showDropDown;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
