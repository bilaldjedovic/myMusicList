import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  //link for webapi
  readonly CategoryApiUrl = "https://localhost:7212/api";

  constructor(private http:HttpClient) { }

  //song api/angular methods
  getSongList():Observable<any[]>{
    return this.http.get<any>(this.CategoryApiUrl + "/Songs");
  }

  addSong(data:any){
    return this.http.post(this.CategoryApiUrl + "/Songs", data);
  }

  updateSong(id:number, data:any){
    return this.http.put(this.CategoryApiUrl + `/Songs/${id}`, data);
  }

  deleteSong(id:number){
    return this.http.delete(this.CategoryApiUrl + `/Songs/${id}`);
  }
  //category api/angular methods

  getCategoryList():Observable<any[]>{
    return this.http.get<any>(this.CategoryApiUrl + '/Categories');
  }

  addCategory(data:any){
    return this.http.post(this.CategoryApiUrl + '/Categories' , data);
  }

  updateCategory(id:number, data:any){
    return this.http.put(this.CategoryApiUrl+ `/Categories/${id}`, data);
  }

  deleteCategory(id:number){
    return this.http.delete(this.CategoryApiUrl + `/Categories/${id}`)
  }

 
  

}
