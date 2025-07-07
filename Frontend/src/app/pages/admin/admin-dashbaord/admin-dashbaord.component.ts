import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminserviceService } from '../../../services/adminservice.service';

@Component({
  selector: 'app-admin-dashbaord',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css'
})
export class AdminDashbaordComponent {

  summary = {
    totalUsers: 0,
    totalAdmin: 0,
    activeUsers: 0,
    inactiveUsers: 0
  };

  users: any[] = [];

  filter = {
    email: '',
    active: ''
  };

  constructor(private service: AdminserviceService) { }

  ngOnInit(): void {
    this.loadSummary();
    this.loadUsers();
  }

  loadSummary() {
    this.service.getSummary().subscribe(data => {
      console.log("Summary for db: ",data);
      this.summary = {
        totalUsers: data.totalUsers || 0,
        totalAdmin: data.adminValue || 0,
        activeUsers: data.activeUsers || 0,
        inactiveUsers: data.inActiveUsers || 0
      };
    });
  }

  loadUsers() {
    const { email, active } = this.filter;
    console.log('Fetching users with:', email, active);
    this.service.getAllUsers(email, active).subscribe(data => {
      console.log('Users loaded:', data);
      this.users = data;
    });
  }

  activate(id: number) {
    this.service.activateUser(id).subscribe(() => this.loadUsers());
  }

  deactivate(id: number) {
    this.service.deactivateUser(id).subscribe(() => this.loadUsers());
  }

  clearFilters() {
    this.filter = { email: '', active: '' };
    this.loadUsers();
  }
}
