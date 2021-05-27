import { Products } from 'src/app/model/products';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[];
  cartData = {len: 0, cost: 0};

  constructor() {
    this.initCart();
   }

   initCart(): void {
     if(typeof(localStorage) !== "undefined") {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartData = JSON.parse(localStorage.getItem('cartData'));
      this.cart = cart ? cart : []; // Si le ocalstorage contient des données
      this.cartData = cartData ? cartData : {len: 0, cost: 0};;
     } else {
       this.cart = [];
       this.cartData = {len: 0, cost: 0};
     }
   }

  updateDataCart() {
    let len = 0;
    let cost = 0;
    this.cart.forEach(element => {
      len += element.number;
      cost += element.product.price*element.number; // On multiplie le prix unitaire par le nombre de ce produit dans le panier = prix total pour ce produit
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
    // Verification si le navigateur support le localStorage
    if (typeof(localStorage) !== "undefined" ) {
      localStorage.setItem("cart",JSON.stringify(this.cart))
      localStorage.setItem("cartData",JSON.stringify(this.cartData))
    }
  }

  addProductToCart(newProduct: Products): void {
    // Verification si le produit est dans le panier
    const checkedProduct = this.cart.find(element => element.product.idProduct == newProduct.idProduct);

    if (checkedProduct) {
      checkedProduct.number ++;
    } else {
      // Definition du nouveau produit
      const newProductToAdd = {
        number: 1,
        product: newProduct
      };
      // Ajout du nouveau produit au panier
      this.cart.push(newProductToAdd);
    }

    // Mise à jour du panier
    this.updateDataCart();
  }

  deleteFromCart(productToDelete: Products): void {
    // Recherche l'index du produit danse tableau cart
    const indexProduct = this.cart.findIndex(element => element.product == productToDelete);
    if (indexProduct != -1) {// Le produit est dans le panier
      if (this.cart[indexProduct].number>1) {// Si il y en a plus de 1
        this.cart[indexProduct].number--; // On decrémente le nombre de ce produit dans le panier
      } else { // Si il n'y a qu'un produit
        this.cart.splice(indexProduct, 1);// On supprime le produit du panier
      }
    }
    this.updateDataCart();
  }

  removeElementOfCart(index: number): void{
    this.cart.splice(index,1);
    this.updateDataCart();
  }
}
