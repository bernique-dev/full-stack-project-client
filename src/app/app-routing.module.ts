import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {RouterModule, Routes} from "@angular/router";
import {ShopListComponent} from "./shop-list/shop-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ShopDetailsComponent} from "./shop-details/shop-details.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductModifyComponent} from "./product-modify/product-modify.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryDetailsComponent} from "./category-details/category-details.component";
import {CategoryModifyComponent} from "./category-modify/category-modify.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";

const routes: Routes = [
  { path: 'shops', component: ShopListComponent },
  {path: 'shop/:id', component: ShopDetailsComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/modify/:id', component: ProductModifyComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'category/details/:id', component: CategoryDetailsComponent },
  { path: 'category/create', component: CategoryCreateComponent },
  { path: 'category/modify/:id', component: CategoryModifyComponent }
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
