import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ProductListComponent} from './product-list/product-list.component';
import {NgxBootstrapMultiselectModule} from "ngx-bootstrap-multiselect";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        NgxBootstrapMultiselectModule,
        RouterOutlet,
        AppRoutingModule
    ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
