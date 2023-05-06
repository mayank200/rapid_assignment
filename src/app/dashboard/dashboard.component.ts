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

  pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  pieChartData = [120, 150, 180, 90];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
            display: false     }
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

  constructor(private http:HttpClient) { }

  ngOnInit(): void {



    this.getTable();
  }


  getTable(){
    this.http.get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==').pipe(
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

      this.tableData.map((el:any)=>{

        this.pieChartLabels.push(el['EmployeeName']);

        el['per_worked'] = (el['time_worked_hours'] / this.total_hours) * 100;

        this.pieChartData.push(el['per_worked']);
      });

      console.log(this.total_hours,this.tableData);
    });
  }

  errorHandler(error:Response){
    return throwError(error || 'Server Error');
  }

  getPage(pageNo: number) {
    this.p = pageNo;

  }

}
