import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    url: String;

    constructor(private http: HttpClient){
        this.url = '/api/'
    }

    addItem(item) {
        return this.http.post(this.url + 'item', item).toPromise();
    }

    findAllItems(){
        return this.http.get(this.url + 'items').toPromise();
    }

    deleteItem(itemId) {
        return this.http.delete(this.url + 'item/' + itemId).toPromise();
    }

    updateItem(item) {
        return this.http.put(this.url + 'item', item).toPromise();
    }

}