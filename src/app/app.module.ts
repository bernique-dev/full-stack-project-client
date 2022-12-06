import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductListComponent} from './product-list/product-list.component';
import {NgxBootstrapMultiselectModule} from "ngx-bootstrap-multiselect";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductModifyComponent} from './product-modify/product-modify.component';

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
    FormsModule
  ],
  exports: [
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    ProductCreateComponent,
    ProductModifyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
