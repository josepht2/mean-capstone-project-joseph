import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    url: String;
    user;

    constructor(private http: HttpClient){
        this.url = '/api/';
        this.user = {};
    }

    addUser(user) {
        return this.http.post(this.url + 'user', user).toPromise();
    }

    getUserByCredentials(user) {
        return this.http.post(this.url + 'login', user).toPromise();
    }

    getAllUsers(){
        return this.http.get(this.url + 'users').toPromise();
    }

    deleteUser(userId) {
        return this.http.delete(this.url + 'user', userId).toPromise();
    }

    updateUser(user) {
        return this.http.put(this.url + 'user', user).toPromise();
    }

    setUser(user){
        this.user = user;
    }

    getUser(){
        return this.user;
    }

}