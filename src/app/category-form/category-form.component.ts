import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../category.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../shared/category";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  providers: [CategoryService],
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm = new FormGroup({
    categoryName: new FormControl()
  });
  categoryId: number = 0

  isModifying? : boolean = undefined

  constructor(private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.categoryId = params['id']
          this.isModifying = true

          this.categoryService.getCategory(this.categoryId).subscribe(category => {
              this.categoryForm.controls['categoryName'].setValue(category!.name)
            }
          )
        } else {
          this.isModifying = false
          this.categoryForm.controls['categoryName'].setValue("New category")
        }

      }
    )

  }


  createProduct() {
    this.categoryService.addCategory(this.generateCategory(0)).subscribe(
      result => this.router.navigateByUrl('category/details/' + result)
    )
  }

  modifyProduct(id: number) {
    this.categoryService.modifyCategory(this.generateCategory(id)).subscribe(
      result => this.router.navigateByUrl('category/details/' + result)
    )
  }

  private generateCategory(id: number): Category {
    return {
      id: id,
      name: this.categoryForm.controls['categoryName'].value
    }
  }

}
