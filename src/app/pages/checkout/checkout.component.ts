import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule ,ReactiveFormsModule ,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{
   private readonly formBuilder=inject(FormBuilder);
   private readonly activatedRoute=inject(ActivatedRoute);
   private readonly ordersService=inject(OrdersService);
  





  checkoutForm!:FormGroup;
  cartId:string|null="";
  isLoading:boolean=false;






  ngOnInit(): void {
   this.checkoutFormSubmit();
   this.getCartId();
      
  }


  checkoutFormSubmit():void{
    this.checkoutForm=this.formBuilder.group({
      details:[null , [Validators.required ,]],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null , [Validators.required]]
     })

  }


  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId=param.get('id')
      }, 
    })
  }


  submitForm():void{
    console.log(this.checkoutForm.value);
    this.isLoading=true;

    this.ordersService.checkoutPayment(this.cartId , this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        open(res.session.url , "_self")

        this.isLoading=false;
        
      } ,error:(err)=>{
        console.log(err);
        
        this.isLoading=false;
      }
    })
    
  }


  


}
