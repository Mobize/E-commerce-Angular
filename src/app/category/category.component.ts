import { Category } from './../model/category';
import { CategoryService } from './../services/category.service';
import { Products } from './../model/products';
import { Subscription } from 'rxjs';
import { ProductsService } from './../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  products : Products[];
  productSub: Subscription;
  categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request) => {

        this.categoryService.getCategoryById(request.id.toString()).subscribe(
          (category: Category) => {
            if (category) {
              this.categoryName = category.name;
              // console.log(this.categoryName );
            }
          }
        );
        // console.log(request.id);
        this.productSub = this.productService.prodSubject.subscribe(
          (data: Products[]) => {
            const prod = data.filter(product => {
              return product.Category == +request.id;
            });
            this.products = prod;
          }
        );
        this.productService.emitProducts();
      }
    );
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }

}
