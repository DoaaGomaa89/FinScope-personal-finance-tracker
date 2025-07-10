import { Component, OnInit } from '@angular/core';
import { DashboardService, TransactionResponse } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-recent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-recent.component.html',
  styleUrl: './dashboard-recent.component.css'
})
export class DashboardRecentComponent implements OnInit{

  recentTransactions: TransactionResponse[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit():void{
    this.service.getRecentTransacations().subscribe({
      next : (data) => this.recentTransactions = data,
      error: (err) => {}
    });
  }

}
