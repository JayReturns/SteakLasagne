import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {GraphsetService} from "../../services/graphset.service";
import {GraphSet} from "../../models/graphset.model";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'graph-component',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements AfterViewInit {
  userId?: string;
  graphSets: GraphSet[] = [];
  dates: string[] = [];
  expenses: number[] = [];
  incomes: number[] = [];
  sum!: number;
  sums: number[] = [];
  date: Date = new Date;
  AccumulatedTransactionChart: any = [];
  DifferentiatedTransactionChart: any = [];

  @ViewChild('differentiatedTransactions') differentiatedTransactionsCanvas!: ElementRef;
  @ViewChild('accumulatedTransactions') accumulatedTransactionsCanvas!: ElementRef;

  constructor(private graphsetService: GraphsetService,
              private keyCloak: KeycloakService) {
    Chart.register(...registerables);
  }



  async ngAfterViewInit() {
    const userProfile = await this.keyCloak.loadUserProfile();
    this.userId = userProfile.id;
    this.graphsetService.getGraphset(this.userId!).subscribe(result => {
      this.graphSets = result;

      for (const graphSet of this.graphSets) {
        graphSet.expense = -Math.abs(graphSet.expense)

        graphSet.date = new Date(graphSet.date)

        this.dates.push(graphSet.date.toLocaleDateString())





        this.expenses.push(graphSet.expense)
        this.incomes.push(graphSet.income)
        this.sum = (graphSet.income + graphSet.expense)

        if (this.sums.length > 1) {
          this.sums.push(this.sums[this.sums.length - 1] + this.sum)
        } else {
          this.sums.push(this.sum)
        }
      }

      const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
      const equal = (ctx: any, value: any) => ctx.p0.parsed.y == ctx.p1.parsed.y ? value : undefined;

      this.AccumulatedTransactionChart = new Chart(this.accumulatedTransactionsCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              label: "Kontostand",
              data: this.sums,
              fill: false,
              borderColor: "#33c45c",
              backgroundColor: "#33c45c",
              borderWidth: 3,
              segment: {
                borderColor: ctx => down(ctx, "#db3b5b") || equal(ctx, "gray"),
              },
              pointBackgroundColor: "darkgray",
              pointHoverBorderColor: "gray",
              pointHoverBorderWidth: 3,
              pointHoverRadius: 5,
              tension: 0.2
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Datum',
                font: {
                  size: 14
                }
              },

            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Kontostand (€)',
                font: {
                  size: 14
                }

              },
            }
          },
          plugins: {


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
              data: this.expenses,
              backgroundColor: "#db3b5b",
              hoverBackgroundColor: "#DC143C"
            },
            {
              label: "Einnahmen",
              data: this.incomes,
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
              title: {
                display: true,
                text: 'Datum'
                ,
                font: {
                  size: 14
                }
              },

            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Veränderungen (€)',
                font: {
                  size: 14
                }
              },
            }
          },
          plugins: {


          },
        }
      });
    });
  }
}

