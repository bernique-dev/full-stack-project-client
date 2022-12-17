import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {RouterModule, Routes} from "@angular/router";
import {ShopListComponent} from "./shop-list/shop-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ShopDetailsComponent} from "./shop-details/shop-details.component";
import {ShopModifyComponent} from "./shop-modify/shop-modify.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductModifyComponent} from "./product-modify/product-modify.component";
import {ShopCreateComponent} from "./shop-create/shop-create.component";

const routes: Routes = [
  { path: 'shops', component: ShopListComponent },
  {path: 'shop/details/:id', component: ShopDetailsComponent},
  {path: 'shop/modify/:id', component: ShopModifyComponent},
  {path: 'shop/create', component: ShopCreateComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/modify/:id', component: ProductModifyComponent }
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
