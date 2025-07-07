import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finance-tracker-frontend';
  constructor(private router: Router) {}

isAuthPage(): boolean {
  return this.router.url === '/login' || this.router.url === '/register';
}

}
