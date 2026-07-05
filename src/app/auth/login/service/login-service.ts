import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model.model';
import { environment } from '../../../../constant';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
   private http = inject(HttpClient); 
  private apiUrl = environment.backendUrl + '/Auth/login';

  createPost(newPost: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.apiUrl, newPost);
  }

}
