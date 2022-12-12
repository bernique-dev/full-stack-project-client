import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "./shared/product";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(environment.productsUrl)
  }

  getProductsFromCategory(categoryId : number) : Observable<Product[]> {
    let params = new HttpParams().append('category', categoryId)
    return this.http.get<Product[]>(environment.productsUrl, {params})
  }

  getProductsFromShop(shopId : number) : Observable<Product[]> {
    let params = new HttpParams().append('shop', shopId)
    return this.http.get<Product[]>(environment.productsUrl, {params})
  }

  getProductsFromShopAndCategory(shopId : number, categoryId : number) : Observable<Product[]> {
    let params = new HttpParams().append('shop', shopId).append('category', categoryId)
    console.log(params)
    return this.http.get<Product[]>(environment.productsUrl, {params})
  }

  getProduct(id: number) : Observable<Product> {
    return this.http.get<Product>(environment.productsUrl + '/' + id)
  }

  addProduct(product : Product) : Observable<Product> {
    let productObject = {...product}
    // @ts-ignore
    delete productObject['id']
    const {productsUrl} = environment;
    return this.http.post<Product>(productsUrl, productObject, environment.httpOptions);
  }

  modifyProduct(product : Product) {
    let productObject = {...product}
    // @ts-ignore
    delete productObject['id']
    const {productsUrl, httpOptions} = environment;
    return this.http.patch<Product>(productsUrl + '/' + product.id, productObject, httpOptions)
  }

  deleteProduct(product : Product) {
    const {productsUrl, httpOptions} = environment;
    return this.http.delete<Product>(productsUrl + '/' + product.id, httpOptions)
  }

}
