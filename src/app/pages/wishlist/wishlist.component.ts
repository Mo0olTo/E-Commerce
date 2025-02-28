import { Iproduct } from './../../shared/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService=inject(WishlistService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly cartService=inject(CartService)
   private readonly toastrService=inject(ToastrService)



  ngOnInit(): void {
   
    this.getUserId()
    this.getUserWishlist()
    
  }


  wishListDetails:Iwishlist[]= [] ;

  isLoading:boolean=false;

  userId:string|null=""

  addToWishlist(id:string):void{
   this.wishlistService.addProductToWishList(id).subscribe({
    next:(res)=>{
      console.log(res);

      
      
    } , error:(err)=>{
      console.log(err);
      
    }
   })
  }



   removeWishlistItem(id:string):void{
    this.isLoading=true
      this.wishlistService.removeWishlistProduct(id).subscribe({
        next:(res)=>{
          console.log(res);

          this.wishListDetails=res.data;
            this.isLoading=false;

        }, error:(err)=>{

          console.log(err);
          this.isLoading=true;
        }
      })

    }



    getUserId():void{
      this.activatedRoute.paramMap.subscribe({
        next:(para)=>{
          this.userId = para.get('id')

          
          
        }
      })

    }


    getUserWishlist():void{
       this.wishlistService.getLoggedUserWishList().subscribe({
        next:(res)=>{
          console.log(res.data);

          this.wishListDetails = res.data
          console.log(this.wishListDetails); 
          
          
        } , error:(err)=>{
          console.log(err);
          
        }

      })
    }



    addToCart(id:string):void{
      this.isLoading=true;
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);

        

          this.toastrService.success(res.message , ' ')
          this.isLoading=false
        },
        error:(err)=>{
          console.log(err);
          this.isLoading=true;
        
        }
      })

    }





}
