import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {RouterModule, Routes} from "@angular/router";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductModifyComponent} from "./product-modify/product-modify.component";

const routes: Routes = [
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
