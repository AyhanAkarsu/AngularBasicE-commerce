import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-list/product/product-details/product-details.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { AuthComponent } from './auth/auth.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "products/createProduct", component: ProductCreateComponent, canActivate: [AdminGuard]},
  {path: "products/createCategory", component: CategoryCreateComponent, canActivate: [AdminGuard]},
  {path: "products", component: ProductListComponent},
  {path: "products/:productID", component: ProductDetailsComponent},
  {path: "products/category/:categoryId", component: ProductComponent},
  {path: "auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
