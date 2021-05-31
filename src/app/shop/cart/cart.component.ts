import { Products } from './../../model/products';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = [];
  prefUrlImage = `${environment.prefixUrlImage}`;
  cartData;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
  }

  addProduct(product: Products): void {
    this.cartService.addProductToCart(product);
  }

  deleteProduct(product: Products): void {
    // console.log(product)
    this.cartService.deleteFromCart(product);
  }

  deleteCompleteProduct(product: Products): void {
    console.log(product);
    this.cartService.removeElementOfCart(0);
  }

}
