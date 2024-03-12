import { Component, OnInit, inject } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoggerService } from '../../services/logger.service';

interface ChartData {
  Timestamp: string;
  Value: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [AgChartsAngular, HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  logger = inject(LoggerService)
  public chartOptions: AgChartOptions = {};
  // public chartOptions2: AgChartOptions = {};
  chartDataArray!: ChartData[];
  groupedData: { [key: string]: ChartData[] } = {};
  firstGroupedDay: string | null = null;
  loading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Load data from JSON file
  loadData(): void {
    this.http.get<ChartData[]>('assets/data/JSON.json').subscribe(data => {
      this.chartDataArray = data;
      this.groupDataByDay();
      this.getFirstGroupedDay();
    });
  }

  // Group data by day
  groupDataByDay(): void {
    this.chartDataArray.forEach(item => {
      const day = new Date(item.Timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      if (!this.groupedData[day]) {
        this.groupedData[day] = [];
      }

      this.groupedData[day].push(item);
    });
  }

  // Get the first grouped day
  getFirstGroupedDay(): void {
    this.firstGroupedDay = Object.keys(this.groupedData)[1] || null;
    if (this.firstGroupedDay) {
      this.displayDataForDay(this.firstGroupedDay);
      this.logger.log('firstGroupedDay:', this.firstGroupedDay);
    } else {
      console.error('No grouped days found.');
    }
  }

  // Display data for a specific day
  displayDataForDay(selectedDay: string): void {
    if (this.groupedData[selectedDay]) {
      const dataForSelectedDay = this.groupedData[selectedDay].map(item => ({
        ...item,
        Timestamp: new Date(item.Timestamp).toLocaleTimeString('no-NO')
      }));

      const highestValueData = dataForSelectedDay.reduce((acc, curr) => {
        if (curr.Value > acc.value) {
          return { timestamp: curr.Timestamp, value: curr.Value };
        }
        return acc;
      }, { timestamp: '', value: -Infinity });

      // Create constant data for the peak value line
      const peakValueData = [
        // { Timestamp: dataForSelectedDay[0].Timestamp, PeakValue: highestValueData.value },
        { Timestamp: highestValueData.timestamp, PeakValue: highestValueData.value },
        // { Timestamp: dataForSelectedDay[dataForSelectedDay.length - 1].Timestamp, PeakValue: highestValueData.value }
      ];
      this.logger.log('highestValue', highestValueData);

      this.chartOptions = {
        title: { text: "Power peak"},
        subtitle: { text: `Data from Oppdrett - ${this.firstGroupedDay}`},
        data: dataForSelectedDay,
        series: [
          {
            type: 'line',
            xKey: 'Timestamp',
            yKey: 'Value'
          },
          {
            type: 'line',
            xKey: 'Timestamp',
            yKey: 'PeakValue',
            data: peakValueData,
            stroke: '#E07A5F',
            strokeWidth: 2,
          }
        ]
      };

      this.loading = false;
    } else {
      console.error('Data for selected day does not exist.');
    }
  }

}