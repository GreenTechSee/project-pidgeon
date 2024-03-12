import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { LoggerService } from '../../services/logger.service';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { ChartComponent } from '../../components/chart/chart.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ButtonModule, 
    StyleClassModule, 
    TranslateModule, 
    RippleModule,
    AgChartsAngular,
    ChartComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  readonly #logger = inject(LoggerService);
  http = inject(HttpClient);

  public chartOptions: AgChartOptions;

  constructor() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe((res) => {
      this.#logger.log('res:', res);
    });

    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };
  }
}
