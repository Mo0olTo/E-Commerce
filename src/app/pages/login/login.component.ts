import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators ,FormBuilder}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink ,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  private readonly formBuilder=inject(FormBuilder);



  logInForm:FormGroup=this.formBuilder.group({
    email:[null , [Validators.required , Validators.email] ] ,
    password:[null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)]]
  })



  

  // logInForm:FormGroup=new FormGroup({
  //   email:new FormControl(null,[Validators.required , Validators.email]) ,
  //   password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)])
  // })


  



  isLoading:boolean=false;

  msgSuccess:string=''
  msgError:string=''






  submitForm():void{
   if(this.logInForm.valid){
    this.isLoading=true;


    this.authService.sendLoginForm(this.logInForm.value).subscribe({
     next:(res)=>{
       console.log(res);
       if(res.message === 'success'){
         
        

         setTimeout(() => {

          localStorage.setItem('userToken', res.token);

          this.authService.saveUserData();



           this.router.navigate(['/home'])

           
         }, 800);
         
         
         this.msgSuccess = res.message
         
       }

       this.isLoading=false;
       
     },
     error:(err:HttpErrorResponse)=>{
       console.log(err);

       this.msgError=err.error.message
       this.isLoading=false;

       
      }
    })
  }
    }


    registerBtn():void{
      this.router.navigate(['/register'])
    }

}
