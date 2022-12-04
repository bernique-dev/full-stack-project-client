import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'products', component: ProductListComponent }
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
