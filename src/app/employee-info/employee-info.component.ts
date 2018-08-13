import { EmployeeService } from '../employee.service';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { FormControl, FormGroup,FormBuilder,NgForm, Validators  } from '@angular/forms';


@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
employee:IEmployee;
  isDisabled: boolean = true;
  employeeForm: FormGroup;
  added: boolean = false;
  employeeList:IEmployee[]= new Array();;
    
  

  constructor(private fb:FormBuilder,  private employeeService: EmployeeService) { }

  ngOnInit() {
    
    
    this.employeeForm = this.fb.group ({
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
  
    get email() { return this.employeeForm.get('email'); }
     
    get name() { return this.employeeForm.get('name'); }
 
    get gender() { return this.employeeForm.get('gender'); }
 
    get age() { return this.employeeForm.get('age'); }
  
  get dob() { return this.employeeForm.get('dob'); }
 
    get department() { return this.employeeForm.get('department'); }
  
  public onFormSubmit() {
        if(this.employeeForm.valid) {
            this.employee = this.employeeForm.value;
          this.CalculateAge();
          console.log(this.employee);
          
            /* Any API call logic via services goes here */
          this.save();
          this.added = true;
          this.employeeList.push(this.employee);
          this.employee=new IEmployee();
        }
    }
  
   public CalculateAge(): void
     {
         if(this.employee.dob){
            
         let dob:any = new Date(this.employee.dob).getTime();
            let timeDiff : any = Date.now() - dob;
            //Used Math.floor instead of Math.ceil
            //so 26 years and 140 days would be considered as 26, not 27.
            this.employee.age = Math.abs(new Date(timeDiff).getUTCFullYear()-1970);
           this.employeeForm.setValue(this.employee);
        }
    }
  
  
   save():void { 
     console.log(this.employee);
   
  //  this.employee = new employee:IEmployee('', this.employeeForm.value.name, this.employeeForm.value.email, this.employeeForm.value.dob, this.employeeForm.department, this.employeeForm.value.gender,, this.employeeForm.value.age);
    this.employeeService.postEmployee(this.employee).subscribe((data) => {console.log('Success', data)}
      , (err) => console.log('Error', err));

  }

}


