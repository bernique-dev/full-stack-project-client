import {Component, OnInit} from '@angular/core';
import {Category} from "../shared/category";
import {CategoryService} from "../category.service";
import {CategorySorter} from "../shared/category-sorter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  providers: [CategoryService],
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []
  displayedCategories: Category[] = []


  //  Page managing
  activePageNumber: number = 1
  maxCategoryPerPage: number = 14
  topCategoryIndex: number = 1

  maxNavPagesNumber: number = 7
  totalNavPagesNumber: number = 1
  firstNavPage: number = 1
  visibleNavPages: number = 1

  //  Sorting
  currentSorter: CategorySorter = {
    name: "Trier",
    function: (p1, p2) => p1.id - p2.id
  }
  sorters: CategorySorter[] = [
    {
      name: "Nom ↑",
      function: (c1: Category, c2: Category) => c2.name.localeCompare(c1.name)
    }, {
      name: "Nom ↓",
      function: (c1: Category, c2: Category) => c1.name.localeCompare(c2.name)
    }
  ]

  //  Filtering
  nameFilterValue: string = "";
  nameFilter = (c: Category) => this.nameFilterValue.length > 0 ? c.name.toUpperCase().includes(this.nameFilterValue.toUpperCase()) : true

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe({
        next: categories => {
          this.categories = categories
          this.displayedCategories = this.categories
          this.calculatePagesNumber()
          console.log("pages number")
        },
        error: error => {
          this.router.navigateByUrl('error/' + error.status)
        }
      }
    )

  }

  displayCategoriesPage(pageNumber: number) {
    this.activePageNumber = pageNumber
    this.topCategoryIndex = 1 + ((this.activePageNumber - 1) * this.maxCategoryPerPage)

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
    this.totalNavPagesNumber = Math.ceil(this.displayedCategories.length / this.maxCategoryPerPage)
    this.visibleNavPages = Math.min(this.maxNavPagesNumber, this.totalNavPagesNumber)
    this.displayCategoriesPage(1)
  }

  sortWith(sorter: CategorySorter) {
    this.currentSorter = sorter
    this.displayedCategories.sort(sorter.function)
  }

  filterCategories() {
    this.displayedCategories = this.categories.filter(
      c => this.nameFilter(c)
    )
    this.calculatePagesNumber()
  }

  filterName(filterValue: string) {
    this.nameFilterValue = filterValue
    this.filterCategories()
  }

}
