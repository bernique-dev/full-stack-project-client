import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from './product-list/product-list.component';
import {NgxBootstrapMultiselectModule} from "ngx-bootstrap-multiselect";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductModifyComponent} from './product-modify/product-modify.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgxBootstrapMultiselectModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    FormsModule
  ],
  declarations: [
    AppComponent,
    ShopListComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    ProductCreateComponent,
    ProductModifyComponent,
    ShopDetailsComponent,
    CategoryListComponent
  ],
  providers: [
    ProductDetailsComponent,
    ShopDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
