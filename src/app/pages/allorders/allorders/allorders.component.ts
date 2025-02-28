import { jwtDecode } from 'jwt-decode';
import { subscribe } from 'diagnostics_channel';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Iorders } from '../../../shared/interfaces/iorders';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-allorders',
  imports: [ CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly ordersService=inject(OrdersService);
  private readonly authService=inject(AuthService)


  myToken:any = jwtDecode(localStorage.getItem('userToken')!)
  userId:any={};


  allOrders:Iorders[]=[]



  ngOnInit(): void {
      
    this.getUserOrders()
    
     
      
      
  }

  getUserOrders():void{
    this.ordersService.getUserOrders(this.myToken.id).subscribe({
      next:(res)=>{
        console.log(res);

        this.allOrders=res
        
      }
    })
  }





  



}
