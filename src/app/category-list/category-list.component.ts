import { Component, OnInit} from '@angular/core';
import { category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit{
    categories: category[]
    selectedCategory: category | null
    displayAll = true
    constructor(private categorySevice: CategoryService) {}
  ngOnInit(): void {
    this.categorySevice.getCategory().subscribe(result => {
      this.categories = result
    })
  }
    
  selectCategory(category?: category) {
    if(category) {
      this.selectedCategory = category
      this.displayAll = false
    }
    else {
        this.selectedCategory = null
        this.displayAll = true
    }
  }
}
