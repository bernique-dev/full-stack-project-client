import {Component, OnInit} from '@angular/core'
import {ProductService} from "../product.service"
import {Product} from "../shared/product"
import {ProductSorter} from "../shared/productsorter";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../category.service";
import {Category} from "../shared/category";
import {IMultiSelectSettings} from "ngx-bootstrap-multiselect";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService, CategoryService, NgbDropdownModule],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = []
  categories : Category[] = []
  displayedProducts : Product[] = []

  //  Page managing
  activePageNumber : number = 1
  maxProductPerPage : number = 6
  topProductIndex : number = 1

  maxNavPagesNumber : number = 7
  totalNavPagesNumber : number = 1
  firstNavPage : number = 1
  visibleNavPages : number = 1

  //  Sorting
  currentSorter : ProductSorter = {
    name: "Sort",
    function: (p1, p2) => p1.id - p2.id
  }
  sorters : ProductSorter[] = [
    {
      name: "Name ↑",
      function: (p1 : Product, p2 : Product) => p2.name.localeCompare(p1.name)
    },{
      name: "Name ↓",
      function: (p1 : Product, p2 : Product) => p1.name.localeCompare(p2.name)
    },{
      name: "Price ↑",
      function: (p1 : Product, p2 : Product) => p2.price - p1.price
    },{
      name: "Price ↓",
      function: (p1 : Product, p2 : Product) => p1.price - p2.price
    }
  ]

  //  Filtering
  nameFilterValue : string = "";
  nameFilter = (p : Product) => this.nameFilterValue.length > 0 ? p.name.toUpperCase().includes(this.nameFilterValue.toUpperCase()) : true
  descriptionFilterValue : string = "";
  descriptionFilter = (p : Product) => this.descriptionFilterValue.length > 0 ? p.description.toUpperCase().includes(this.descriptionFilterValue.toUpperCase()) : true
  minPriceFilterValue : number = -Infinity;
  maxPriceFilterValue : number = Infinity;
  priceFilter = (p: Product) => p.price >= this.minPriceFilterValue && p.price <= this.maxPriceFilterValue

    //  Categories Filtering
  categoriesFilterValue : Category[] = [];
  categoriesFilter(p : Product) : boolean {
    for (let category of this.categoriesFilterValue) {
      if (!p.categories.find(c => c.id == category.id)) {
        return false;
      }
    }
    return true;
  }
  optionsModel: number[] = [];
  // Settings configuration
  mySettings: IMultiSelectSettings = {
    dynamicTitleMaxItems: 1
  };

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts()
    this.getCategories()


    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    console.log(id)
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products
        this.displayedProducts = this.products
        this.calculatePagesNumber()
        this.displayProductsPage(1)
    })
  }

  getCategories() : void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories
      })
  }

  displayProductsPage(pageNumber : number) {
    this.activePageNumber = pageNumber
    this.topProductIndex = 1 + ((this.activePageNumber-1) * this.maxProductPerPage)

    let offset = Math.floor(this.maxNavPagesNumber / 2)
    if (this.activePageNumber - offset <= 1) {
      this.firstNavPage = 1;
    } else if (this.activePageNumber + offset >= this.totalNavPagesNumber) {
      this.firstNavPage = this.totalNavPagesNumber - this.maxNavPagesNumber + 1;
    } else {
      this.firstNavPage = this.activePageNumber - offset;
    }

  }

  calculatePagesNumber() {
    this.totalNavPagesNumber = Math.ceil(this.displayedProducts.length / this.maxProductPerPage)
    this.visibleNavPages = Math.min(this.maxNavPagesNumber, this.totalNavPagesNumber)
    this.displayProductsPage(1)
    // console.log(this.totalNavPagesNumber)
  }

  sortWith(sorter : ProductSorter) {
    this.currentSorter = sorter
    this.displayedProducts.sort(sorter.function)
  }

  filterProducts() {
    this.displayedProducts = this.products.filter(
      p => this.nameFilter(p) && this.descriptionFilter(p) && this.categoriesFilter(p) && this.priceFilter(p)
    )
    this.calculatePagesNumber()
  }

  filterName(filterValue : string) {
    this.nameFilterValue = filterValue
    this.filterProducts()
  }

  filterDescription(filterValue : string) {
    this.descriptionFilterValue = filterValue
    this.filterProducts()
  }

  filterCategories(filterValue : number[]) {
    this.categoriesFilterValue = this.categories.filter(c => filterValue.includes(c.id))
    this.filterProducts()
  }

  filterMinPrice(filterValue : number) {
    this.minPriceFilterValue = filterValue
    this.filterProducts()
  }

  filterMaxPrice(filterValue : number) {
    this.maxPriceFilterValue = filterValue
    this.filterProducts()
  }
}
