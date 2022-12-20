import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../shared/product";
import {forkJoin, Observable} from "rxjs";
import {Category} from "../shared/category";
import {ShopService} from "../shop.service";
import {CategoryService} from "../category.service";
import {Shop} from "../shared/shop";
import {IMultiSelectSettings, IMultiSelectTexts} from "ngx-bootstrap-multiselect";
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService} from "../language.service";
import {Translation} from "../shared/translation";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  providers: [ProductService, ShopService, CategoryService, LanguageService],
  styleUrls: ['./product-form.component.css'],
  exportAs: 'ngModel'
})
export class ProductFormComponent implements OnInit {

  productForm = new FormGroup({
    productName: new FormControl(),
    productDescription: new FormControl(),
    productPrice: new FormControl(),
    productCategories: new FormControl(),
    productShop: new FormControl(),
    productTranslationLanguage: new FormControl(),
    productTranslationName: new FormControl(),
    productTranslationDescription: new FormControl()
  });
  productId: number = -1

  isModifying?: boolean = undefined
  shops: Shop[] = []
  languages: string[] = []

  categories: Category[] = []
  categoryIndexes: number[] = [];
  // Settings configuration
  mySettings: IMultiSelectSettings = {
    dynamicTitleMaxItems: 1
  };

  myTexts: IMultiSelectTexts = {
    defaultTitle: "Sélectionner"
  }

  translations: { [key: string]: Translation } = {}

  constructor(private route: ActivatedRoute, private router: Router,
              private productService: ProductService,
              private shopService: ShopService,
              private categoryService: CategoryService,
              private languageService: LanguageService) {
  }

  ngOnInit(): void {

    let params = this.route.snapshot.params
    let queryParams = this.route.snapshot.queryParams

    let queryObservables: Observable<any>[] = [
      this.shopService.getShops(), this.categoryService.getCategories(), this.languageService.getLanguages()
    ]
    if (params['id']) {
      this.productId = params['id']
      queryObservables.push(this.productService.getProduct(params['id']))

      forkJoin(queryObservables).subscribe(results => {
          this.isModifying = true
          this.shops = results[0]
          this.categories = results[1]
          this.languages = results[2]

          let product: Product = results[3]
          product!.shop = {
            id: product!.shopId
          }
          this.categoryIndexes = product.categories.map(c1 => this.categories.findIndex(c2 => c1.id == c2.id) + 1)

          this.productForm.controls['productName'].setValue(product!.name)
          this.productForm.controls['productDescription'].setValue(product!.description)
          this.productForm.controls['productPrice'].setValue(product!.price)
          this.productForm.controls['productCategories'].setValue(product!.categories.map(c => c.id))
          this.productForm.controls['productShop'].setValue(this.shops.find(s => s.id == product!.shopId))

          this.languages.forEach(l => this.translations[l] = new Translation('', ''))
          for (let prop in product.translations) {
            let translation = product.translations[prop]
            this.translations[prop] = new Translation(translation.translatedName, translation.translatedDescription)
          }
          let englishIndex = this.languages.indexOf("EN")
          this.setCurrentTranslationLanguage(this.languages[englishIndex < 0 ? 0 : englishIndex])
        }
      )
    } else {

      forkJoin(queryObservables).subscribe(results => {
          this.isModifying = false
          this.shops = results[0]
          this.categories = results[1]
          this.languages = results[2]

          let productCategories = []
          if (queryParams['category']) {
            let potentialCategory = Number(queryParams['category'])
            if (this.categories.find(c => c.id == potentialCategory)) {
              productCategories.push(potentialCategory)
            }
          }

          let productShop = this.shops[0]
          if (Number(queryParams['shop'])) {
            let potentialShop = this.shops.find(s => s.id == queryParams['shop'])
            if (potentialShop) {
              productShop = potentialShop
            }
          }

          this.productForm.controls['productName'].setValue("Nouveau Produit")
          this.productForm.controls['productDescription'].setValue("")
          this.productForm.controls['productPrice'].setValue(0)
          this.productForm.controls['productCategories'].setValue(productCategories)
          this.productForm.controls['productShop'].setValue(productShop)

          this.languages.forEach(l => this.translations[l] = new Translation('', ''))
          let englishIndex = this.languages.indexOf("EN")
          this.setCurrentTranslationLanguage(this.languages[englishIndex < 0 ? 0 : englishIndex])
        }
      )
    }

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
    let productTranslations: { [key: string]: Translation } = {}
    for (let prop in this.translations) {
      if ((this.translations[prop] as Translation).isSendable()) {
        productTranslations[prop] = this.translations[prop]
      }
    }
    return {
      id: id,
      name: this.productForm.controls['productName'].value,
      description: this.productForm.controls['productDescription'].value,
      price: this.productForm.controls['productPrice'].value,
      categories: this.productForm.controls['productCategories'].value.map((idx: number) => this.categories.find(c => idx == c.id)),
      shop: {id: this.productForm.controls['productShop'].value.id},
      shopId: this.productForm.controls['productShop'].value.id,
      shopName: this.productForm.controls['productShop'].value.name,
      translations: productTranslations
    }
  }

  sortFormCategories() {
    this.productForm.value.productCategories = (this.productForm.value.productCategories as number[]).sort((a, b) => a - b)
  }

  setCurrentTranslationLanguage(language: string) {
    this.productForm.controls['productTranslationLanguage'].setValue(language)
    this.productForm.controls['productTranslationName'].setValue(this.translations[language].translatedName)
    this.productForm.controls['productTranslationDescription'].setValue(this.translations[language].translatedDescription)
  }

  changeCurrentTranslation() {
    this.translations[this.productForm.get('productTranslationLanguage')!.value].translatedName = this.productForm.get('productTranslationName')!.value
    this.translations[this.productForm.get('productTranslationLanguage')!.value].translatedDescription = this.productForm.get('productTranslationDescription')!.value
  }

}
