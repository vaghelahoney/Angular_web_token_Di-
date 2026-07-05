import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../service/login-service';
import { LoginModel } from '../models/login-model.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service';


@Component({
  selector: 'app-login-componets',
  imports: [ReactiveFormsModule],
  templateUrl: './login-componets.html',
  styleUrl: './login-componets.css',
})
export class LoginComponets implements OnInit   {
  private loginService = inject(LoginService);
  private authService = inject(AuthService);
private router = inject(Router);
  private fb = inject(FormBuilder);

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get f() {
    return this.userForm.controls;
  }

    public login = new  LoginModel;

  ngOnInit(): void {
    // Initiate the HTTP request by subscribing to t
  }

  onSubmit() {  

    if (!this.userForm.valid) {
      alert('Form is invalid. Please check the input fields.');
      return;
    }
    const newPost = this.userForm.value as LoginModel;
debugger;
    this.loginService.createPost(newPost).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.setToken(token);
        if (this.authService.isAuthenticated()) {

          this.router.navigate(['/employee']);
        }


        console.log(response);
      },
      error: (err) => {
        console.error('Failed to fetch posts:', err); // Catch network errors
      }
    });
  }


}
