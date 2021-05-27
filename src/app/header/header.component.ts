import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Subscription } from 'rxjs';
import { Category } from './../model/category';
import { CategoryService } from './../services/category.service';
import { Cart } from './../model/cart';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;
  categories: Category[];
  categorySub: Subscription;
  isAuth: boolean;

  constructor(private cartService: CartService,
              private categoryService: CategoryService,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;

    this.categorySub = this.categoryService.categorySubject.subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
    this.categoryService.emitCategories();

    this.isAuth = this.userService.isAuth;
  }

  logout(): void {
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
    this.router.navigate(['/shop'])
  }

}
