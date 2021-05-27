import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products = [];
  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe( // On souscrit à 'observable qui emet (ProductService => prodSubject)
    (data) => {
      this.products = this.prodService.getProductByPage(0)//data;
    }
  );

  this.prodService.emitProducts(); // Emission des produits à jour
  }

}
