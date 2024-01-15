import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

   resetForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient) { this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });}

  ngOnInit() {
    
  }
  
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
