import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CategorySummaryDto, DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard-category-summary',
  standalone: true,
  imports: [NgChartsModule, CommonModule, RouterLink],
  templateUrl: './dashboard-category-summary.component.html',
  styleUrl: './dashboard-category-summary.component.css'
})
export class DashboardCategorySummaryComponent {

  categorySummary: CategorySummaryDto[] = [];

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;

  pieChartColors = [{
    backgroundColor: [
      '#6366F1', '#EF4444', '#F59E0B', '#A855F7', '#10B981', '#ff9f40'
    ]
  }];

  pieChartOptions: any = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        display: false
        // labels: {
        //   usePointStyle: true,
        //   pointStyle: 'circle',
        //   font: {
        //     size: 10
        //   }
        // }
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          const sum = ctx.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
          const percentage = Math.round((value * 100) / sum) + '%'; 
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        }
      },
      tooltip: {
        enabled: true,
              titleFont: { size: 12 },
      bodyFont: { size: 11 },
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw.toLocaleString();
            return `${tooltipItem.label}: ₹${value}`;
          }
        }
      }
    }
  };
public pieChartPlugins =  [ChartDataLabels];


  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.fetchCategoryData();
  }

  fetchCategoryData(): void {
    this.service.getCategorySummary().subscribe({
      next: (data: CategorySummaryDto[]) => {
        this.prepareChartData(data);
      },
      error: (err) => {
        console.error('Error loading category summary', err);
      }
    });
  }

  prepareChartData(data: CategorySummaryDto[]): void {
    this.categorySummary = data;
    const sorted = [...data].sort((a, b) => b.totalAmount - a.totalAmount);
    const top5 = sorted.slice(0, 4);
    const others = sorted.slice(4);

    this.pieChartLabels = top5.map(item => item.category);
    this.pieChartData = top5.map(item => item.totalAmount);

    if (others.length > 0) {
      const othersTotal = others.reduce((sum, item) => sum + item.totalAmount, 0);
      this.pieChartLabels.push('Others');
      this.pieChartData.push(othersTotal);
    }
  }
  getPercentage(amount: number): string {
  const total = this.pieChartData.reduce((sum, value) => sum + value, 0);
  return ((amount / total) * 100).toFixed(0);
}

}
