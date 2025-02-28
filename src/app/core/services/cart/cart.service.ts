import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {




  constructor(private readonly httpClient:HttpClient) { }


  myToken:any=localStorage.getItem('userToken');
  cartNumber:WritableSignal<number> = signal(0)



  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart` , 
      {
         "productId": id
      },
    )
  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }


  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` ,)
  }


  updateCartQuantity(id:string ,newQuantity:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}` , {
      "count" : newQuantity
    } )
  }
  emptyCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart` )
  }
}
