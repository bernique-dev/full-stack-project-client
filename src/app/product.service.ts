import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./shared/product";
import {Observable} from "rxjs";

@Injectable()
export class ProductService {
  productsUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
  }

}
