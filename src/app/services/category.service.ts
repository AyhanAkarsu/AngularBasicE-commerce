import { Injectable } from "@angular/core";
import { category } from "../models/category";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable()
export class CategoryService {
    private url = "https://"
    
    constructor(private http: HttpClient){}

    postCategory(category: category): Observable<category> {
        return this.http.post<category>(this.url + "category.json", category)
    }

    getCategory(): Observable<category[]> {
        return this.http.get<category[]>(this.url + "category.json")
        .pipe(
            map(data => {
                const categories: category[] = []

                for(const key in data) {
                    categories.push({...data[key]})
                }
                return categories
            })
        )
    }
}