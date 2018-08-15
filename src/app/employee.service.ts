import {Injectable} from '@angular/core';
import {IEmployee} from './employee-info/employee';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EmployeeService {
  headers: Headers;
  options: RequestOptions;
  
  
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({headers: this.headers});
  }
  
  postEmployee(user: IEmployee): Observable<any>
  {
    let body = JSON.stringify(user);
    let postUrl = "https://young-springs-16530.herokuapp.com/add";
    return this.http
      .post(postUrl, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }  
   
   
private extractData(res: Response) {
  let body = res.json();
  return body || {};
}
  
  
private getData(res: Response) {
  let body = res._body;
  return JSON.parse(body) || {};
}
  
  
getEmployeeHttp(): Observable < IEmployee[] > {
  let getUrl = "https://young-springs-16530.herokuapp.com/employee";
  return this.http
    .get(getUrl, this.options)
    .map(this.getData)
    .catch(this.handleError);
}
  
  
deleteEmployeeWithId(key: string, val: string): Observable < IEmployee[] > {
  let deleteUrl = "https://young-springs-16530.herokuapp.com/delete";
  return this.http
    .delete(deleteUrl + "/" + val, this.options).map(this.extractData).catch(this.handleError);
}
  
updateEmployeeWithId(user: IEmployee): Observable < IEmployee[] > {
  let body = JSON.stringify(user);
  let updateUrl = "https://young-springs-16530.herokuapp.com/update" + "/" + user._id;
  return this.http
    .put(updateUrl, body, this.options).map(this.extractData).catch(this.handleError);
}
  
  
private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}
}