import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeInfoComponent
  ],
  imports: [
    BrowserModule, RouterModule,FormsModule, RouterModule.forRoot([
      {path: 'app-employee-info', component: EmployeeInfoComponent},
      

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
