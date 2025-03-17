import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { category } from '../models/category';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductCreateComponent implements OnInit {
  categories: category[] = []
  error: string = ""
  color:string
  model:any = {
    category: 0
  }
  public Editor = ClassicEditor
  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.categories = data
    })
  }
  
  saveProject(form: NgForm) {
    if(this.model.category == 0) {
          this.color = "danger"
          this.error = "geçerli bir category bilgisi girmelisiniz."
          return
        }
    const product = {
        id: this.model.id ,name: this.model.name, price: this.model.price, imageURL: this.model.imageURL, description: this.model.description, isActive: this.model.isActive, categoryID: this.model.category
      }
        this.productService.postProducts(product).subscribe(data =>{
            this.color = "success"
            this.error = "Ürün başarılı bir şekilde eklendi."
            setTimeout(() => {
              this.router.navigate(['/products'])
            }, 500);
          })
  }
}

  // saveProject(id:any,name:any, price:any, imageURL:any, description:any, isActive:any, category:any) {
  //   const product = {
  //    id: id.value ,name: name.value, price: price.value, imageURL: imageURL.value, description: description.value, isActive: isActive.checked, categoryID: category.value
  //   }
  //   if(id.value == "") {
  //     this.error = "geçerli bir ID bilgisi girmelisiniz."
  //     return
  //   }
  //   if(name.value == "") {
  //     this.error = "geçerli bir name bilgisi girmelisiniz."
  //     return
  //   }
  //   if(price.value == "") {
  //     this.error = "geçerli bir price bilgisi girmelisiniz."
  //     return
  //   }
  //   if(imageURL.value == "") {
  //     this.error = "geçerli bir imageURL bilgisi girmelisiniz."
  //     return
  //   }
  //   if(description.value == "") {
  //     this.error = "geçerli bir description bilgisi girmelisiniz."
  //     return
  //   }
  //   if(category.value == 0) {
  //     this.error = "geçerli bir category bilgisi girmelisiniz."
  //     return
  //   }

  //   this.productService.postProducts(product).subscribe(data =>{
  //     this.router.navigate(['/products'])
  //   })
  // }


