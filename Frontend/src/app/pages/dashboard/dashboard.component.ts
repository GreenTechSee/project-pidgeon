import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  content?: string;

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.log('Hello from dashboard');

  }
}
