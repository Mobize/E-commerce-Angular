import { Result } from './../model/result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products[] = [];
  prodSubject = new Subject<Products[]>();// Definition de l'observable

  numberOfProductByPage = 8;

  constructor(private http: HttpClient) {
    this.getProductsFromServer(); // Initialise la liste des produits lorsque l'on injecte le service
   }

  emitProducts() { // Emission des produits => Observable (Subject)
    this.prodSubject.next(this.products);
  }

  getProductsFromServer() {
    const url = `${environment.api + 'products?API_KEY=' + environment.api_key}`;
    this.http.get(url).subscribe(
      (dataProducts: Result) => {
        if (dataProducts.status === 200) {
          this.products = dataProducts.result;
          this.emitProducts();
        } else {
          console.log("Error : "+ dataProducts.message);

        }
      }
    )
  }

  getProductById(id: number): Products {
    const product = this.products.find(element => element.idProduct == id);
    if(product) {
      return product
    }
    return null;
  }

  getProductByPage(numberPage: number): Products[] {
    const numberOfPage = this.products.length/this.numberOfProductByPage;
    if (numberPage > 0 || numberPage <  numberOfPage) {
      const prodResult = this.products.slice(numberPage*this.numberOfProductByPage,(numberPage+1)*this.numberOfProductByPage );
      return prodResult;
    }
    return null;
  }
}
