import { ICart } from './../../shared/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLink ,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService)
  


  cartDetails:ICart= {} as ICart ;

  ngOnInit(): void {
    this.getCartData()
      
  }


  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);  //total cart products , products=[{}]

        this.cartDetails=res.data;


      }, error:(err)=>{
        console.log(err);
        
      }


    })
  }

  removeCartItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);

        this.cartDetails=res.data;

        this.cartService.cartNumber.set(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



  updateCount(id:string , count:number):void{
    this.cartService.updateCartQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data
        
      }, error:(err)=>{
        console.log(err);
        
      }
    })
  }



  emptyCartItems():void{
    this.cartService.emptyCart().subscribe({
      next:(res)=>{
        console.log(res);

        if(res.message === "success"){

          this.cartDetails = {} as ICart;

          this.cartService.cartNumber.set(0)
        }
        
      }
    })
  }



}
