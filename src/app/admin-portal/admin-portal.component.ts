import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ItemService } from '../services/item.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  users;
  items;
  mode;
  method;
  newUser;
  newItem;
  user;

  userForm: FormGroup;
  username: FormControl;
  password: FormControl;
  role: FormControl;

  itemForm: FormGroup;
  name: FormControl;
  cost: FormControl;

  createFormControls(){
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.role = new FormControl('', this.roleValidator);

    this.name = new FormControl('', Validators.required);
    this.cost = new FormControl('', [Validators.required, this.costValidator]);
  }

  createForm(){
    this.userForm = new FormGroup({
      username: this.username,
      password: this.password,
      role: this.role
    });

    this.itemForm = new FormGroup({
      name: this.name,
      cost: this.cost
    });
  }

  roleValidator(control: FormControl) {
    let role = control.value;
    let result = {invalidRole: true};
    if(role && (role === 'user' || role === 'admin')){
      result = null;
    }
    return result;
  }

  costValidator(control: FormControl) {
    let result = {invalidCost: true};
    if(this && this.mode === 'items') {
      let cost = control.value;
      let costLength = cost.length;
      let isNumber = Number(cost);
      if(cost && !isNaN(isNumber) && cost.includes('.') && cost.indexOf('.') === (costLength - 3)){
        result = null;
      }
    }
    return result;
  }

  constructor(private router: Router, private userService: UserService, private itemService: ItemService) { 
    this.mode = 'items';
    this.method = 'create';
    this.user = this.userService.getUser();
    itemService.findAllItems().then(items => {
      this.items = items;
    });
    userService.getAllUsers().then(users => {
      this.users=users;
    });
    this.newItem = {};
    this.newUser = {};
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.role.setValue('role');
  }

  goHome() {
    this.userService.setUser({});
    this.router.navigate(['']);
  }

  onModeChange(event){
    let value = event.target.value;
    if(value !== this.mode) {
      this.mode = value;
      this.method = 'create';
      this.newUser._id = '';
      this.newItem._id = '';
      this.userForm.reset();
      this.role.setValue('role');
      this.itemForm.reset();
      if(value === 'items') {
        this.itemService.findAllItems().then(items => {
          this.items=items;
        });
      }
      else if(value === 'users') {
        this.userService.getAllUsers().then(users => {
          this.users=users;
        });
      }
    }
  }

  editUser(user) {
    this.method = 'update';
    this.newUser._id = user._id;
    this.userForm.setValue({
      username: user.username,
      password: user.password,
      role: user.role
    });
  }

  editItem(item) {
    this.method = 'update';
    this.newItem._id = item._id;
    this.itemForm.setValue({
      name: item.name,
      cost: item.cost
    });
  }

  cancelUpdate() {
    this.method = 'create';
    this.newUser._id = '';
    this.newItem._id = '';
    this.userForm.reset();
    this.role.setValue('role');
    this.itemForm.reset();
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).then( res => {
      this.userService.getAllUsers().then(users => {
        this.users = users;
      });
    })
  }

  deleteItem(itemId) {
    this.itemService.deleteItem(itemId).then( res => {
      this.itemService.findAllItems().then(items => {
        this.items = items;
      });
    })
  }

  updateUser() {
    this.newUser.username = this.userForm.value.username;
    this.newUser.password = this.userForm.value.password;
    this.newUser.role = this.userForm.value.role;
    this.userService.updateUser(this.newUser).then( res => {
      this.userService.getAllUsers().then(users => {
        this.users = users;
      });
    })
  }

  updateItem() {
    this.newItem.name = this.itemForm.value.name;
    this.newItem.cost = Number(this.itemForm.value.cost);
    this.itemService.updateItem(this.newItem).then( res => {
      this.itemService.findAllItems().then(items => {
        this.items = items;
      });
    })
  }

  createUser() {
    this.userService.addUser(this.userForm.value).then(res => {
      this.userForm.reset();
      this.role.setValue('role');
      this.userService.getAllUsers().then(users => {
        this.users = users;
      });
    });
  }

  createItem() {
    let tempItem = {
      name: this.itemForm.value.name,
      cost: Number(this.itemForm.value.cost)
    }
    this.itemService.addItem(tempItem).then(res => {
      this.itemForm.reset();
      this.itemService.findAllItems().then(items => {
        this.items = items;
      });
    });
  }

}
