import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent {
  error: string = ""
  color:string = ""
  model:any = {

  }
  constructor(private categoryService: CategoryService, private router: Router) {}
  saveProject(form: NgForm) {
    const category = {
      id: this.model.id, name: this.model.name
    }
    this.categoryService.postCategory(category).subscribe(data =>{
      this.color = "success"
      this.error = "Kategori başarılı bir şekilde eklende.."
      setTimeout(() => {
        this.router.navigate(['/products'])
      }, 500);
    })
  }
}
