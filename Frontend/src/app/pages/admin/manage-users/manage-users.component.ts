import { Component } from '@angular/core';
import { AdminserviceService } from '../../../services/adminservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users: any[] = [];
  filter = {
    email: '',
    role: ''
  };
  message = '';
  noData = false;

  constructor(private service: AdminserviceService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.service.getAllUsers(this.filter.email).subscribe(data => {
      if (this.filter.role) {
        this.users = data.filter((user: any) => user.roles.includes(this.filter.role));
      } else {
        this.users = data;
      }
      this.noData = this.users.length === 0;
    });
  }

  makeAdmin(id: number) {
    if(confirm('Are you sure you want to promote this user to admin?')){
      this.service.makeAdmin(id).subscribe(() => this.loadUser());
    }
  }

    removeAdmin(id: number) {
    if (confirm('Are you sure you want to revoke admin rights?')) {
      this.service.removeAdmin(id).subscribe(() => this.loadUser());
    }
  }

    hasRole(user: any, role: string): boolean {
    return user.roles.includes(role);
  }

    clearFilters() {
    this.filter = { email: '', role: '' };
    this.loadUser();
  }
}