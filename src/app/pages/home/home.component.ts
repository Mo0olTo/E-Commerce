
import { Component, inject, Inject, OnInit, PipeTransform } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../core/pipes/term.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink , TermPipe , SearchPipe , FormsModule , CurrencyPipe ,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

 private readonly productsService = inject(ProductsService);
 private readonly categoriesService = inject(CategoriesService);
 private readonly cartService=inject(CartService)
 private readonly toastrService=inject(ToastrService)
 private readonly wishlistService=inject(WishlistService);
 private readonly ngxSpinnerService=inject(NgxSpinnerService);

 customMainOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  rtl:true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
 
}

 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  rtl:true ,
  dots: true,
  autoplay:true,
  autoplaySpeed:2000,
  navSpeed: 700,
  navText: ['Previous', 'Next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}





     text:string=" ";
     isLoading:boolean=false;
     isAdded:boolean=false;


     isWishlisted:boolean=false;

    products:Iproduct[]=[]
    categories:Icategories[]=[]
    

    ngOnInit(): void{
      this.getProductsData();
      this.getCategoryData();
 
 
   }


    getProductsData():void{
      this.ngxSpinnerService.show('loading-2')
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
          
          this.products=res.data;

          this.ngxSpinnerService.hide('loading-2')
          
        },
        error:(err)=>{
          console.log(err)
          
        }
      })
    }

    getCategoryData():void{
      
      this.categoriesService.getAllCategories().subscribe({
        next:(resp)=>{
          this.categories=resp.data;
          
        } ,
        error:(err) => {
            console.log(err);
            
        },
      })
    }

    
    addToCart(id:string):void{
      this.isLoading=true;
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);

          this.isLoading=false

          this.toastrService.success(res.message , ' Fresh Cart ')

          this.cartService.cartNumber.set(res.numOfCartItems) 

          console.log(this.cartService.cartNumber);
          

          
        },
        error:(err)=>{
          console.log(err);

          this.isLoading=true
        }
      })

    }



    addToWishlist(id:string):void{
      this.isAdded=true;
      this.wishlistService.addProductToWishList(id).subscribe({
       next:(res)=>{
         console.log(res);

         this.isAdded=false;
        this.toastrService.success(res.message)
        if(res.status === "success"){
          this.isWishlisted=false;
        }

         
       } , error:(err)=>{
         console.log(err);
         this.isAdded=true
         
       }
      })
     }



     toogleWishlisted():void{
      this.isWishlisted = !this.isWishlisted;
     }

   




 

}
