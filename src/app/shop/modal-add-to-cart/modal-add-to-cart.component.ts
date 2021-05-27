import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.css']
})
export class ModalAddToCartComponent implements OnInit {

  @Input() products: Products[];
  prefixUrlImage = `${environment.prefixUrlImage}`;
  cartData;
  // textProduct: string;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartData = this.cartService.cartData;
    // this.textProduct = this.cartData.len > 1 ? 'articles' : 'article';
  }

}
