import { Component,OnInit} from '@angular/core';
import { product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: product[] = []
  loading: boolean = false
 
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true
    this.productService.getProducts(params["categoryId"]).subscribe(result => {
        this.products = result
        this.loading = false
    })
    })
   }
}
