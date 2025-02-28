import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly httpClient:HttpClient) { }

  myToken:any = localStorage.getItem('userToken')

  checkoutPayment(id:string|null , data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` ,
      {      
        "shippingAddress":data
      } ,
    


    )
  }




  getUserOrders(id:string|null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }


}
