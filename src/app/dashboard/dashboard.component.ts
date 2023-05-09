import { Component, OnInit, Injectable } from '@angular/core';
import { Observable,of,throwError  } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, ChartOptions, ChartType, controllers } from 'chart.js';
// import { SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class DashboardComponent implements OnInit {

  tableData: any = [];
  total_hours: any =0;
  table_length: any =0;
  p:any=1;
  limit:any=10;

  pieChartLabels = [];
  pieChartData = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': 'http://yourappdomain.com'
    })
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
            // display: false;
               }
  };
  public pieChartPlugins = [
    {
      beforeInit: function(chart, options) {
        chart.legend.afterFit = function() {
          this.height += 50;
        };
      }
    }
  ];
  activechart: any= 'c';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {



    this.getTable();
  }


  getTable(){
    this.http.get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==',this.httpOptions).pipe(
      retry(1),
      catchError(this.errorHandler)
    ).subscribe((resData:any)=>{

      this.tableData = resData;

      this.table_length = resData.length;
      this.total_hours = 0;

      this.tableData.map((el:any)=>{
el['time_worked_minutes'] = Math.abs((new Date(el.EndTimeUtc).getTime() - new Date(el.StarTimeUtc).getTime()) / 1000 / 60) ;
el['time_worked_hours'] = Math.abs((new Date(el.EndTimeUtc).getTime() - new Date(el.StarTimeUtc).getTime()) / 1000 / 60/ 60) ;

this.total_hours += el['time_worked_hours'];


      })

this.pieChartLabels =[];
this.pieChartData = [];

      this.tableData.map((el:any,i:any)=>{


        el['per_worked'] = (el['time_worked_hours'] / this.total_hours) * 100;

        if(i>=((this.p-1)*10) && i<((this.p)*10)){

          this.pieChartLabels.push(el['EmployeeName']);

          this.pieChartData.push(el['per_worked']);
        }
      });
    });
  }

  errorHandler(error:Response){
    return throwError(error || 'Server Error');
  }

  getPage(pageNo: number) {
    this.p = pageNo;


    this.pieChartLabels =[];
this.pieChartData = [];

      this.tableData.map((el:any,i:any)=>{


        el['per_worked'] = (el['time_worked_hours'] / this.total_hours) * 100;

        if(i>=((this.p-1)*10) && i<((this.p)*10)){

          this.pieChartLabels.push(el['EmployeeName']);

          this.pieChartData.push(el['per_worked']);
        }
      });

  }


  changegraph(type:any){
    this.pieChartLabels =[];
    this.pieChartData = [];


    if(type == 'c'){

      this.activechart = 'c';
      this.pieChartOptions = {
        responsive: true,
        legend: { display: true }
      };
    this.tableData.map((el:any,i:any)=>{
      if(i>=((this.p-1)*10) && i<((this.p)*10)){

        this.pieChartLabels.push(el['EmployeeName']);

        this.pieChartData.push(el['per_worked']);
      }
    })
    } else if(type == 'a') {

      this.activechart = 'a';

      this.pieChartOptions = {
        responsive: true,
        legend: { display: false }
      };

      this.tableData.map((el:any,i:any)=>{
          this.pieChartLabels.push(el['EmployeeName']);

          this.pieChartData.push(el['per_worked']);
      })
    }
  }

}
