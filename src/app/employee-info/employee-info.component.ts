import { EmployeeService } from '../employee.service';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators  } from '@angular/forms';
import { UUID } from 'angular2-uuid';

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
  employeeList:IEmployee[] = new Array();
  
    
  

  constructor(private fb:FormBuilder,  private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployee();
    
    this.employeeForm = this.fb.group ({
      _id:[''],
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
          this.currentRow = this.employeeForm.value;
          this.CalculateAge();
          console.log(this.currentRow);

            /* Any API call logic via services goes here */
          this.save();
          
          this.employeeList.push(this.currentRow);
          this.currentRow = new IEmployee();
           console.log("Form Submitted!");
         this.employeeForm.reset();
        }
    }
  

  
   public CalculateAge(): void
     {
         if(this.currentRow.dob){
            
         let dob:any = new Date(this.currentRow.dob).getTime();
            let timeDiff : any = Date.now() - dob;
            //Used Math.floor instead of Math.ceil
            //so 26 years and 140 days would be considered as 26, not 27.
            this.currentRow.age = Math.abs(new Date(timeDiff).getUTCFullYear()-1970);
           this.employeeForm.setValue(this.currentRow);
        }
    }
  
  editEmployee = function (employee:IEmployee) {  
    this.currentRow = Object.assign({}, employee);
  }; 
  
  getTemplate = function (employee:IEmployee) {  
    if (employee._id === this.selected._id){  
        return 'edit';  
    }  
    else return 'display';  
};
  
  
   getEmployee() {
    this.employeeService.getEmployeeHttp().subscribe((data) => { this.employeeList=data}
                                                               ,(err) => console.log('Error', err));
    
  }
  
   updateEmployee(employee:IEmployee):void{
     console.log(employee);
   

   this.employeeService.updateEmployeeWithId("_id",employee._id).subscribe((users) => {
                                                                                       this.employeeList = users
                                                                                       this.getEmployee();
                                                                                      },
                                                                        ((err) => console.log('Error', err)));
    
  }
  
  removeEmployee(employee:IEmployee):void{
      console.log(employee);

   this.employeeService.deleteEmployeeWithId("_id",employee._id).subscribe((users) => {
                                                                                       this.employeeList = users
                                                                                       this.getEmployee();
                                                                                      },
                                                                        ((err) => console.log('Error', err)));
    
  }
  
   
  
   save():void { 
     this.modeValue = 'add';
   
     console.log(this.currentRow);
   
  //  this.employee = new employee:IEmployee('', this.employeeForm.value.name, this.employeeForm.value.email, this.employeeForm.value.dob, this.employeeForm.department, this.employeeForm.value.gender,, this.employeeForm.value.age);
    this.employeeService.postEmployee(this.currentRow).subscribe((data) => {console.log('Success', data), this.currentRow=data}
      , (err) => console.log('Error', err));
 console.log(this.currentRow);
  }

}


