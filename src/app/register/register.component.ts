import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username: FormControl;
  password: FormControl;
  role: FormControl;

  createFormControls(){
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.role = new FormControl('', this.roleValidator);
  }

  createForm(){
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      role: this.role
    });
  }

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.role.setValue('role');
  }
  
  goHome() {
    this.router.navigate(['']);
  }

  registerUser(){
    this.userService.addUser(this.registerForm.value).then(res => {
      this.registerForm.reset();
      this.role.setValue('role');
      this.router.navigate(['login']);
    })
    .catch(error => alert('Something went wrong. Please try again.'));
  }

  roleValidator(control: FormControl) {
    let role = control.value;
    let result = {invalidRole: true};
    if(role && (role === 'user' || role === 'admin')){
      result = null;
    }
    return result;
  }
}
