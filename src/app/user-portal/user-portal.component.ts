import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ItemService } from '../services/item.service';
import { PurchaseService } from '../services/purchase.service';
import { UserService } from '../services/user.service';
import { WishListService } from '../services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  user;
  items;
  purchases;
  cart;
  wishList;
  mode;

  constructor(private router: Router, private userService: UserService, private itemService: ItemService,
    private purchaseService: PurchaseService, private cartService: CartService,
    private wishListService: WishListService) {
    this.mode = 'allItems';
    this.user = this.userService.getUser();
    this.findAllItems();
    this.findAllPurchases();
    this.findCart();
    this.findWishList();
   }

  ngOnInit(): void {
  }

  goHome() {
    this.userService.setUser({});
    this.router.navigate(['']);
  }

  findAllItems() {
    this.itemService.findAllItems().then(items => {
      this.items = items;
    });
  }

  findAllPurchases() {
    this.purchaseService.findPurchases(this.user._id).then(purchases => {
      this.purchases = purchases;
    })
  }

  findCart() {
    this.cartService.findCart(this.user._id).then(cart => {
      this.cart = cart;
    })
  }

  findWishList() {
    this.wishListService.findWishList(this.user._id).then(wishList => {
      this.wishList = wishList;
    })
  }

  changeMode(newMode: String){
    if(this.mode !== newMode){
      this.mode = newMode;
      if(newMode === 'allItems'){
        this.findAllItems();
      }
      else if(newMode === 'purchases') {
        this.findAllPurchases();
      }
      else if(newMode === 'cart') {
        this.findCart();
      }
      else if(newMode === 'wishList') {
        this.findWishList();
      }
    }
  }

  addPurchase(item) {
    let newPurchase = {
      user: this.user._id,
      item: item._id,
      name: item.name,
      cost: item.cost
    };
    this.purchaseService.addPurchase(newPurchase).then(purchase => {
      this.findAllPurchases();
    });
  }

  addCart(item) {
    let newCart = {
      user: this.user._id,
      item: item._id,
      name: item.name,
      cost: item.cost
    };
    this.cartService.addCart(newCart).then(cart => {
      this.findCart();
    });
  }

  addWishList(item) {
    let newWishList = {
      user: this.user._id,
      item: item._id,
      name: item.name,
      cost: item.cost
    };
    this.wishListService.addWishList(newWishList).then(wishList => {
      this.findWishList();
    });
  }

  deleteCart(cid) {
    this.cartService.deleteCart(cid).then(response => {
      this.findCart();
    });
  }

  deleteWishList(wid) {
    this.wishListService.deleteWishList(wid).then(response => {
      this.findWishList();
    });
  }

}
