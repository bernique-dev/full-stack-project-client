import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./shared/category";
import {environment} from '../environments/environment';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(environment.categoriesUrl)
  }

  getCategory(id: number) : Observable<Category> {
    return this.http.get<Category>(environment.categoriesUrl + '/' + id)
  }

  addCategory(category : Category) : Observable<Category> {
    let categoryObject = {...category}
    // @ts-ignore
    delete categoryObject['id']
    const {categoriesUrl} = environment;
    return this.http.post<Category>(categoriesUrl, categoryObject, environment.httpOptions);
  }

  modifyCategory(category : Category) {
    let categoryObject = {...category}
    // @ts-ignore
    delete categoryObject['id']
    const {categoriesUrl: categoriesUrl, httpOptions} = environment;
    return this.http.patch<Category>(categoriesUrl + '/' + category.id, categoryObject, httpOptions)
  }

  deleteCategory(category : Category) {
    const {categoriesUrl, httpOptions} = environment;
    return this.http.delete<Category>(categoriesUrl + '/' + category.id, httpOptions)
  }
}
