import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Category } from './../model/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];
  categorySubject = new Subject<Category[]>();
  cest;

  constructor(private httpCient: HttpClient) {
    this.getCategoryFromServer();
  }

  emitCategories(): void {
    this.categorySubject.next(this.categories);
  }

  getCategoryFromServer(): void {
    const url = `${environment.api + 'category?API_KEY=' + environment.api_key}`;
    this.httpCient.get(url).subscribe(
      (response: Result) => {
        if (response.status == 200) {
          this.categories = response.result;
          this.emitCategories();
        } else {
          console.log(response);
        }
      }
    );
  }

  getCategories(): Observable<any> {
    const url = `${environment.api + 'category?API_KEY=' + environment.api_key}`;
    return this.httpCient.get(url)
  }

  getCategoryById(idCat: string): Observable<Category> {
    return this.getCategories()
    .map( cat => cat.result.find(el=>el.idCategory === idCat));
  }
}
