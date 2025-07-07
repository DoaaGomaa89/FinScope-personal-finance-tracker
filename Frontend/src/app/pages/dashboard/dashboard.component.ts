import { Component} from '@angular/core';



import { DashboardStatsComponent } from "./dashboard-stats/dashboard-stats.component";
import { DashboardMonthlySummaryComponent } from "./dashboard-monthly-summary/dashboard-monthly-summary.component";
import { DashboardCategorySummaryComponent } from "./dashboard-category-summary/dashboard-category-summary.component";
import { DashboardRecentComponent } from "./dashboard-recent/dashboard-recent.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ DashboardStatsComponent, DashboardMonthlySummaryComponent, DashboardCategorySummaryComponent, DashboardRecentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

}