import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from "../models/product";
import { Observable } from "rxjs/internal/Observable";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";


// local service
@Injectable()
export class ProductService {
    private url = "https://"

    constructor(private http: HttpClient, private authService: AuthService) { }

    getProducts(categoryId: number): Observable<product[]> {
        return this.http.get<product[]>(this.url + "products.json")
        .pipe(
            map(data => {
                const products: product[] = []

                for(const key in data){
                    if(categoryId) {
                        if(categoryId == data[key].categoryID){
                            products.push({...data[key], id: key})
                        }
                    }else {
                        products.push({...data[key], id: key})
                    }
                }
                return products
            })
        )
    }

    postProducts(product:product): Observable<product> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.post<product>(this.url + "products.json?auth=" +user?.token ,product)
            })       
        ) 
    }

    getProductsById(ID: string) : Observable<product> {
        return this.http.get<product>(this.url + "products/" + ID + ".json")
    }
}