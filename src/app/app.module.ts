import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FloatTwoPipePipe } from './float-two-pipe.pipe';
import { DatePipePipe } from './date-pipe.pipe';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
// import { httpInterceptor } from './shared/interceptors/httpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FloatTwoPipePipe,
    DatePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
