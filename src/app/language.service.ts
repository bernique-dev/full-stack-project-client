import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguages() : Observable<string[]> {
    return this.http.get<string[]>(environment.languagesUrl)
  }


}
