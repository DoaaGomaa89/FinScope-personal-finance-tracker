import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.css'
})
export class DashboardStatsComponent {

  balance:number = 0;
  income:number = 0;
  expense:number = 0;
  myCash:number = 0;

  constructor(private service:DashboardService){}

  ngOnInit():void{
    this.service.getBalance().subscribe((data) =>{
      console.log("Your Summary of balance", data);
      this.balance = data.onlineBalance;
      this.income = data.totalIncome;
      this.expense = data.totalExpense;
      this.myCash = data.cashBalance;
    });
  }
}
