import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  createFormControls(){
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createForm(){
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }
  
  goHome() {
    this.router.navigate(['']);
  }

  login(){
    this.userService.getUserByCredentials(this.loginForm.value)
    .then(response => {
      this.userService.setUser(response);
      if(response['role'] === 'admin'){
        this.router.navigate(['admin-portal']);
      } else if(response['role'] === 'user'){
        this.router.navigate(['user-portal']);
      }
    })
    .catch(error => alert('No user found with username/password combination.'));
  }

}
