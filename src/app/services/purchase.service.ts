import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    url: String;

    constructor(private http: HttpClient){
        this.url = '/api/';
    }

    addPurchase(purchase) {
        return this.http.post(this.url + 'purchase', purchase).toPromise();
    }

    findPurchases(userId) {
        return this.http.get(this.url + 'purchases/' + userId).toPromise();
    }

}