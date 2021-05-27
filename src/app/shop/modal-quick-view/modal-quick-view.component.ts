import { CartService } from './../../services/cart.service';
import { Products } from './../../model/products';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input() products: Products[];
  prefixUrlImage = `${environment.prefixUrlImage}`;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Products): void {
    this.cartService.addProductToCart(product);
  }

}
