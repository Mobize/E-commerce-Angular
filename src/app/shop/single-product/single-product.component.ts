import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Products } from './../../model/products';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Products;
  prefUrlImage = `${environment.prefixUrlImage}`;
  productSub : Subscription;

  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = +this.route.snapshot.params['id']; // "+" force la chaine de caractère en number

    this.productSub = this.productService.prodSubject.subscribe(
      (data: Products[]) => {
        this.product = this.productService.getProductById(id);
      }
    );
    this.productService.emitProducts();
  }

  addCart(product: Products): void {
    this.cartService.addProductToCart(product);
  }

}
