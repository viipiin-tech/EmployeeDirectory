import {EmployeeService} from '../employee.service';
import {Component, OnInit} from '@angular/core';
import {IEmployee} from './employee';
import {FormControl, FormGroup, FormBuilder, NgForm, Validators} from '@angular/forms';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  employeeForm: FormGroup;
  employeeList: IEmployee[] = new Array();
  errorMsg: string;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}
  ngOnInit() {
    this.getEmployee();
    this.employeeForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['',
        [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      gender: ['', Validators.required],
      age: [''],
    })
  }
  
  get email() {return this.employeeForm.get('email');}
  get name() {return this.employeeForm.get('name');}
  get gender() {return this.employeeForm.get('gender');}
  get age() {return this.employeeForm.get('age');}
  get dob() {return this.employeeForm.get('dob');}
  get department() {return this.employeeForm.get('department');}
  public onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.CalculateAge()) {
        this.save();
        this.employeeList.push(this.employeeForm.value);
        this.employeeForm.reset();
      }
    }
  }
  
  public CalculateAge(): boolean {
    if (this.employeeForm.value.dob) {
      let dob: any = new Date(this.employeeForm.value.dob).getTime();
      let timeDiff: any = Date.now() - dob;
      if (timeDiff > 0) {
        this.employeeForm.value.age = Math.abs(new Date(timeDiff).getUTCFullYear() - 1970);
        return true;
      }
      else {
        this.errorMsg = 'DOB Should not have future date';
        return false;
      }
    }
  }
  
  editEmployee = function(employee: IEmployee) {
    console.log(employee);
    this.employeeForm = this.fb.group({
      _id: [employee._id],
      name: [employee.name],
      email: [employee.email],
      dob: [employee.dob],
      department: [employee.department],
      gender: [employee.gender],
      age: [employee.age],
    })
  };
  
  
  getEmployee() {
    this.employeeService.getEmployeeHttp().subscribe((data) => {
      this.employeeList = data
      console.log(data)
    },
      (err) => console.log('Error', err));
  }
  
  
  updateEmployee(employee: IEmployee): void {
    this.errorMsg = '';
    console.log(employee);
    if (this.CalculateAge()) {
      this.employeeService.updateEmployeeWithId(employee).subscribe((users) => {
        console.log(users);
        console.log(this.employeeList.values);
       },
        ((err) => console.log('Error', err)));
       this.employeeForm.reset();
    }
     this.getEmployee();
  }
  
  removeEmployee(employee: IEmployee): void {
    console.log(employee);
    this.employeeService.deleteEmployeeWithId(employee).subscribe((users) => {
      console.log(users);
      console.log(this.employeeList.values);
    },
      ((err) => console.log('Error', err)));
    this.employeeForm.reset();
    this.getEmployee();
  }
  
  save(): void {
    this.employeeService.postEmployee(this.employeeForm.value).subscribe((data) => {console.log('Success', data), this.employeeForm.setValue(data)}
      , (err) => console.log('Error', err));
    console.log(this.employeeForm.value);
    
  }
}