import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    url: String;

    constructor(private http: HttpClient){
        this.url = '/api/'
    }

    addCart(cart) {
        return this.http.post(this.url + 'cart', cart).toPromise();
    }

    findCart(userId) {
        return this.http.get(this.url + 'carts/' + userId).toPromise();
    }

    deleteCart(cid) {
        return this.http.delete(this.url + 'cart/' + cid).toPromise();
    }

}