import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeInfoComponent
  ],
  imports: [
    BrowserModule,HttpModule, HttpClientModule, ReactiveFormsModule, RouterModule,FormsModule, RouterModule.forRoot([
      {path: 'app-employee-info', component: EmployeeInfoComponent},
      

    ])
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
