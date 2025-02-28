import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { subscribe } from 'diagnostics_channel';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermPipe } from '../../core/pipes/term.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IMetadata } from '../../shared/interfaces/imetadata';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [RouterLink , CurrencyPipe ,FormsModule , SearchPipe ,TermPipe , CarouselModule , TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  text:string=" ";
  isLoading:boolean=false;
  products:Iproduct[]=[];
 

  ngOnInit(): void {
      this.getAllPoductsData();
  }


  getAllPoductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);

        this.products=res.data;
        
      } ,error:(err)=>{
        console.log(err);
        
      }



    })
  }

  addToCart(id:string):void{
    this.isLoading=true;
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);

        this.isLoading=false

        this.toastrService.success(res.message , ' ')
        
      },
      error:(err)=>{
        console.log(err);

        this.isLoading=true
      }
    })

  }



}
