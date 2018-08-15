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
  currentRow: IEmployee;
  isDisabled: boolean = true;
  employeeForm: FormGroup;
  modeValue: any;
  employeeList: IEmployee[] = new Array();
  errorMsg:string;




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
      this.currentRow = this.employeeForm.value;
      if(this.CalculateAge()){
        this.save();
        this.employeeList.push(this.currentRow);
        this.employeeForm.reset();
      }
    }
  }


  public CalculateAge(): boolean {
    if (this.currentRow.dob) {

      let dob: any = new Date(this.currentRow.dob).getTime();
      let timeDiff: any = Date.now() - dob;
      if (timeDiff > 0) {
      
      this.currentRow.age = Math.abs(new Date(timeDiff).getUTCFullYear() - 1970);
      this.employeeForm.setValue(this.currentRow);
        return true;
      }
      else
        {
        this.errorMsg = 'DOB Should not have future date';
        return false;
      }
    }
  }

  editEmployee = function(employee: IEmployee) {
this.errorMsg = '';
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
    console.log(employee);
    if(this.CalculateAge()){
   this.employeeService.updateEmployeeWithId(employee).subscribe((users) => {
      this.employeeList = users
      this.getEmployee();
    },
      ((err) => console.log('Error', err)));
    }
  }

  removeEmployee(employee: IEmployee): void {
    console.log(employee);

    this.employeeService.deleteEmployeeWithId("_id", employee._id).subscribe((users) => {
      this.employeeList = users
      this.getEmployee();
    },
      ((err) => console.log('Error', err)));

  }



  save(): void {
    this.modeValue = 'add';

    console.log(this.currentRow);

   this.employeeService.postEmployee(this.currentRow).subscribe((data) => {console.log('Success', data), this.currentRow = data}
      , (err) => console.log('Error', err));
    console.log(this.currentRow);
  }

}


