import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private readonly httpClient:HttpClient) { }



  addProductToWishList(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist` ,{
      "productId": id
    })
  }



  getLoggedUserWishList():Observable<any>{
    return  this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist` )
  }


  removeWishlistProduct(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}` ,)
  }




}
