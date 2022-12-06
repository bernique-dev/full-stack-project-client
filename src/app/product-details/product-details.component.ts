import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../shared/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  providers: [ProductService],
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.productService.getProduct(params['id']).subscribe(
        product => {
          this.product = product
        },
        _ => {
          this.router.navigateByUrl("products")
        }
      )
    )
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product!).subscribe(
      _ => {
        this.router.navigateByUrl("products")
      }
    )

  }

}
