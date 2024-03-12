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

  calculatePeak(data: any[], peakStartIndex: number, peakEndIndex: number): number {
  // Calculate the total value of the peak
  const peakValue = data.slice(peakStartIndex, peakEndIndex + 1).reduce((sum, item) => sum + item.Value, 0);

  // Calculate the "normalized" value
  const normalizedValue = data.slice(0, peakStartIndex).reduce((sum, item) => sum + item.Value, 0) / peakStartIndex;

  // Calculate the total value of the peak minus the "normalized" value
  const totalPeakMinusNormalized = peakValue - normalizedValue;

  return totalPeakMinusNormalized;
}

  // Display data for a specific day
  displayDataForDay(selectedDay: string): void {
    if (this.groupedData[selectedDay]) {
      const dataForSelectedDay = this.groupedData[selectedDay].map(item => ({
        ...item,
        Timestamp: new Date(item.Timestamp).toLocaleTimeString('no-NO')
      }));

      // Find the peak start and end points
      let peakStartIndex = 0;
      let peakEndIndex = dataForSelectedDay.length - 1;
      let peakStarted = false;
      let peakEnded = false;

      for (let i = 1; i < dataForSelectedDay.length; i++) {
        if (!peakStarted && dataForSelectedDay[i].Value > dataForSelectedDay[i - 1].Value) {
          peakStartIndex = i;
          peakStarted = true;
        }

        if (peakStarted && !peakEnded && dataForSelectedDay[i].Value < dataForSelectedDay[i - 1].Value) {
          peakEndIndex = i - 1;
          peakEnded = true;
        }
      }

      // Calculate the total peak minus the normalized value
      const totalPeakMinusNormalized = this.calculatePeak(dataForSelectedDay, peakStartIndex, peakEndIndex);

      this.logger.log('total peak normalized:', totalPeakMinusNormalized);

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
      const totalPeak = dataForSelectedDay.reduce((sum, item) => sum + item.Value, 0);
      this.logger.log('total peak:', totalPeak);

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