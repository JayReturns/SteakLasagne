import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'graph-component',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  salesData: ChartData<'line'> = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,47,48,49,50],
    datasets: [
      { label: 'Transaktionen', data: [785, 779, 972, 720, 996, -33, 54, 180, 353, 276, 603, 439, 756, 352, 56, 248, 441, -130, 141, 267, 496, 828, 831, 250, 391, 773, 445, 662, 878, 10, 904, -122, 302, 28, 799, 797, 734, -16, 824, 966, 789, 315, 816, 182, 6, 748, 23, 489, 5, 666], tension: 0.75 },

    ],
  };
  Day_to_Day_Transactions: ChartData<'bar'> = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [
      { label: 'Ausgaben', data: [-10,-36,-54,-57,-77,-101,-6,-52,-36,-54], backgroundColor: "#db3b5b", hoverBackgroundColor: "red"},
      { label: 'Einnahmen', data: [69,420,42,145,23,65,37,346,776,34] , backgroundColor: "#33c45c", hoverBackgroundColor: "green"},
    ],
  };
  LineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
  BarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
}
