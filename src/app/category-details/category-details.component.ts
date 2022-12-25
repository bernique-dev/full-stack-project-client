import {Component, OnInit} from '@angular/core';
import {Category} from "../shared/category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  providers: [CategoryService],
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.categoryService.getCategory(params['id']).subscribe({
            next: category => {
              this.category = category
            },
            error: error => {
              this.router.navigateByUrl('error/' + error.status)
            }
          }
        );
      }
    )
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category!).subscribe({
        next: _ => {
          this.router.navigateByUrl("categories")
        },
        error: error => {
          this.router.navigateByUrl('error/' + error.status)
        }
      }
    )
  }

}
