import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../shared/product";
import {forkJoin, Observable} from "rxjs";
import {Category} from "../shared/category";
import {ShopService} from "../shop.service";
import {CategoryService} from "../category.service";
import {Shop} from "../shared/shop";
import {IMultiSelectSettings} from "ngx-bootstrap-multiselect";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  providers: [ProductService, ShopService, CategoryService],
  styleUrls: ['./product-form.component.css'],
  exportAs: 'ngModel'
})
export class ProductFormComponent implements OnInit {

  productForm = new FormGroup({
    productName: new FormControl(),
    productDescription: new FormControl(),
    productPrice: new FormControl(),
    productCategories: new FormControl(),
    productShop: new FormControl()
  });
  productId: number = 0

  isModifying?: boolean = undefined
  shops: Shop[] = []

  categories: Category[] = []
  categoryIndexes: number[] = [];
  // Settings configuration
  mySettings: IMultiSelectSettings = {
    dynamicTitleMaxItems: 1
  };

  constructor(private route: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private shopService: ShopService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {


    this.route.params.subscribe(
      params => {

        let queryObservables: Observable<any>[] = [
          this.shopService.getShops(), this.categoryService.getCategories()
        ]
        if (params['id']) {
          this.productId = params['id']
          queryObservables.push(this.productService.getProduct(params['id']))

          forkJoin(queryObservables).subscribe(results => {
              this.isModifying = true
              this.shops = results[0]
              this.categories = results[1]
              let product: Product = results[2]
              product!.shop = {
                id: product!.shopId
              }
              this.categoryIndexes = product.categories.map(c1 => this.categories.findIndex(c2 => c1.id == c2.id) + 1)

              this.productForm.controls['productName'].setValue(product!.name)
              this.productForm.controls['productDescription'].setValue(product!.description)
              this.productForm.controls['productPrice'].setValue(product!.price)
              this.productForm.controls['productCategories'].setValue(product!.categories.map(c1 => this.categories.findIndex(c2 => c1.id == c2.id) + 1))
              this.productForm.controls['productShop'].setValue(this.shops.find(s => s.id == product!.shopId))

            }
          )
        } else {

          forkJoin(queryObservables).subscribe(results => {
              this.isModifying = false
              this.shops = results[0]
              this.categories = results[1]

              this.productForm.controls['productName'].setValue("New Product")
              this.productForm.controls['productDescription'].setValue("")
              this.productForm.controls['productPrice'].setValue(0)
              this.productForm.controls['productCategories'].setValue([])
              this.productForm.controls['productShop'].setValue(this.shops[0])
            }
          )
        }

      }
    )

  }

  createProduct() {
    this.productService.addProduct(this.generateProduct(0)).subscribe(
      result => this.router.navigateByUrl('product/details/' + result)
    )
  }

  modifyProduct(id: number) {
    this.productService.modifyProduct(this.generateProduct(id)).subscribe(
      result => this.router.navigateByUrl('product/details/' + result)
    )
  }

  private generateProduct(id: number): Product {
    return {
      id: id,
      name: this.productForm.controls['productName'].value,
      description: this.productForm.controls['productDescription'].value,
      price: this.productForm.controls['productPrice'].value,
      categories: this.productForm.controls['productCategories'].value.map((idx: number) => this.categories[idx - 1]),
      shop: this.productForm.controls['productShop'].value,
      shopId: this.productForm.controls['productShop'].value.id,
      shopName: this.productForm.controls['productShop'].value.name
    }
  }

  sortFormCategories() {
    this.productForm.value.productCategories = (this.productForm.value.productCategories as number[]).sort((a, b) => a - b)
  }

}
