import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { DashboardService } from '../../../services/dashboard.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard-monthly-summary',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterLink],
  templateUrl: './dashboard-monthly-summary.component.html',
  styleUrl: './dashboard-monthly-summary.component.css'
})
export class DashboardMonthlySummaryComponent implements OnInit {

  hasData: boolean = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        enabled: true
      }
    },

    scales: {
      x: {
        ticks: {
          color: '#555',
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      },

      y: {
        ticks: {
          color: '#555',
          font: { size: 12 }
        },
        grid: {
          color: '#e5e5e5'
        }
      }
    }
  };

  public barChartLabels: string[] = [];

  public barChartType: 'bar' = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'Income', backgroundColor: '#27ae60' },
    { data: [], label: 'Expense', backgroundColor: '#e74c3c' },
  ];

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getMonthlySummary().subscribe((data) => {
      console.log('Monthly data', data);

      const incomeMap = new Map<string, number>();
      const expenseMap = new Map<string, number>();

      data.forEach(item => {
        if (item.type === 'INCOME') {
          incomeMap.set(item.month, item.totalAmount);
        } else if (item.type === 'EXPENSE') {
          expenseMap.set(item.month, item.totalAmount);
        }
      });

      const allMonths = Array.from(new Set([...incomeMap.keys(), ...expenseMap.keys()])).sort();
      

      this.hasData = allMonths.length > 0
      this.barChartLabels = allMonths;
      this.barChartData[0].data = allMonths.map(month => incomeMap.get(month) || 0);
      this.barChartData[1].data = allMonths.map(month => expenseMap.get(month) || 0);
    });
  }
}
