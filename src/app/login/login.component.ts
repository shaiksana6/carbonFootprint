import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Custom validator function for email format
function emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
  return valid ? null : { invalidEmail: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // usertype: ['', Validators.required],
      username: ['', [Validators.required, emailValidator]],
      password: ['', Validators.required]
    });
  }

  onLoginClick() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      let loginFormData = this.loginForm.getRawValue();
      console.log('Entered Values Are', loginFormData);
      //TODO: replace dummy api url with actual url
      this.httpClient.post('https://localhost:7078/api/Users/login', loginFormData).subscribe({
        next: (res:any) => {
          // success 
          if (res) {
            this.authService.isAdmin=res.userType=='Admin';
            this.authService.login();
           
            this.router.navigate(['/dashboard']);
          }
          console.log('API Success', res);
        },
        error: (err) => {
          this.authService.logout();
          //error
          console.error('API Fail', err);
          this.loginForm?.get('password')?.setErrors({ apiError: true });
        }
      })
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
