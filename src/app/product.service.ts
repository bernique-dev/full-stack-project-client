import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./shared/product";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(environment.productsUrl)
  }

}
