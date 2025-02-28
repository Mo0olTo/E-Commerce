import { BrandsService } from './../../core/services/brands.service';

import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { Ibrands } from '../../shared/interfaces/ibrands';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-details',
  imports: [CarouselModule ,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly brandsService=inject(BrandsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly categoriesService=inject(CategoriesService);




   imageOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 500,
    navText: ['next', 'previ'],
    items:1,
    nav :true
   
  }


  isLoading:boolean=false;

  detailsProduct:Iproduct |null= null;
  detailsBrands:Ibrands |null= null;
  detailsCategories:Icategories |null= null;


  idProduct:string|null=null
  catId:string|null=null
  brandId:string|null=null


  ngOnInit(): void {
  
    this.getProductId();
    this.getProductDetails();
   
   
    
       
  

  }


  addToCart(id:string):void{
    this.isLoading=true;
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);

        this.isLoading=false;

        this.toastrService.success(res.message , " ")
        this.cartService.cartNumber.set(res.numOfCartItems) 
        
      }, error:(err)=>{
        console.log(err);
        
        this.isLoading=true;
      }
    })
  }
  


  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params);
        
        this.idProduct = params.get('id');
        
      }
    })
    
  }

  getProductDetails():void{
    this.productsService.getSpecificProduct(this.idProduct).subscribe({
      next:(res)=>{
        console.log(res.data);

        this.detailsProduct = res.data ;

        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }


  getCategoryId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params);
        this.catId = params.get('id');
      }
    })
    
  }

  getCategoryDetails():void{
    this.categoriesService.getSpecificCategory(this.catId).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.detailsCategories = res.data;

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    
  }


  getBrandid():void{
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params);
        
        
       this.brandId = params.get('id');    }
      })

  }

  getBrandsDetails():void{
    this.brandsService.getSpecificBrand(this.brandId).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.detailsBrands = res.data;

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

}
