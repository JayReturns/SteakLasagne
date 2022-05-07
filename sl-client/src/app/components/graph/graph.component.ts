import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {GraphsetService} from "../../services/graphset.service";
import {GraphSet} from "../../models/graphset.model";

@Component({
  selector: 'graph-component',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements AfterViewInit {

  graphSets: GraphSet[] = [];
  dates: string[] = [];
  sums: number[] = [];
  invSums: number[] = [];
  AccumulatedTransactionChart: any = [];
  DifferentiatedTransactionChart: any = [];

  @ViewChild('differentiatedTransactions') differentiatedTransactionsCanvas!: ElementRef;
  @ViewChild('accumulatedTransactions') accumulatedTransactionsCanvas!: ElementRef;

  constructor(private graphsetService: GraphsetService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.graphsetService.getGraphset().subscribe(result => {
      this.graphSets = result;

      for (const graphSet of this.graphSets) {

        this.dates.push(graphSet.date)

        if (this.sums.length > 1) {
          this.sums.push(this.sums[this.sums.length - 1] + graphSet.sum)
        } else {
          this.sums.push(graphSet.sum)
        }
        this.invSums.push(-Math.abs(graphSet.sum))
        console.log(this.sums);
        console.log(this.invSums);
      }

      const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
      const equal = (ctx: any, value: any) => ctx.p0.parsed.y == ctx.p1.parsed.y ? value : undefined;

      this.AccumulatedTransactionChart = new Chart(this.accumulatedTransactionsCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              label: "Transaktionen",
              data: this.sums,
              fill: false,
              borderColor: "#33c45c",
              borderWidth: 3,
              segment: {
                borderColor: ctx => down(ctx, "#db3b5b") || equal(ctx, "gray"),
              },
              pointBackgroundColor: "gray",
              pointHoverBorderColor: "gray",
              pointHoverBorderWidth: 3,
              pointHoverRadius: 5,
              tension: 0
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Aufsummierte Transaktionen',
            },
          },
        }
      });

      this.DifferentiatedTransactionChart = new Chart(this.differentiatedTransactionsCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.dates,
          datasets: [
            {
              label: "Ausgaben",
              data: this.invSums,
              backgroundColor: "#db3b5b",
              hoverBackgroundColor: "#DC143C"
            },
            {
              label: "Einnahmen",
              data: this.sums,
              backgroundColor: "#33c45c",
              hoverBackgroundColor: "#32CD32"
            }
          ]
        },
        options: {
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
              text: 'Einnahmen/Ausgaben',
            },
          },
        }
      });
    });
  }
}

