import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WishListService {

    url: String;

    constructor(private http: HttpClient){
        this.url = '/api/'
    }

    addWishList(wishList) {
        return this.http.post(this.url + 'wishlist', wishList).toPromise();
    }

    findWishList(userId) {
        return this.http.get(this.url + 'wishlists/' + userId).toPromise();
    }

    deleteWishList(wid) {
        return this.http.delete(this.url + 'wishlist/' + wid).toPromise();
    }

}