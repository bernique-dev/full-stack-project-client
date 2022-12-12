import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {RouterModule, Routes} from "@angular/router";
import {ShopListComponent} from "./shop-list/shop-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ShopDetailsComponent} from "./shop-details/shop-details.component";

const routes: Routes = [
  { path: 'shops', component: ShopListComponent },
  {path: 'shop/:id', component: ShopDetailsComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
