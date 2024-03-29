import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../shared/product";
import {Translation} from "../shared/translation";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  providers: [ProductService],
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  productVersions: { [key: string]: Translation } = {}
  currentVersion = "Original"

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productService.getProduct(params['id']).subscribe(
          {
            next: product => {
              this.product = product
              this.productVersions = {
                [this.currentVersion]: new Translation(this.product.name, this.product.description),
                ...product.translations
              }
            },
            error: error => {
              this.router.navigateByUrl('error/' + error.status)
            }
          }
        );
      }
    )
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product!).subscribe(
      {
        next: _ => {
          this.router.navigateByUrl("products")
        },
        error: error => {
          this.router.navigateByUrl('error/' + error.status)
        }
      }
    )
  }

}
