import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
   private apiUrl = 'https://localhost:7266/api/Employee';

  private http = inject(HttpClient); 

  
  getPosts(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }

  createPost(postData: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(this.apiUrl, postData);
  }

  updatePost(postData: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(this.apiUrl, postData);
  }

  deletePost(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
