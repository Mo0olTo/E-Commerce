import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authService=inject(AuthService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly router=inject(Router)

  step:number=1;
  isLoading:boolean=false;

  userMail:string='';

  

  verifyEmailForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required , Validators.email]]
  })



  verifyCodeForm:FormGroup=this.formBuilder.group({
    resetCode:[null,[Validators.required , Validators.pattern(/^[0-9]{1,10}$/)]]
  })



  resetPassForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required , Validators.email]],
    newPassword:[null,[Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)]]
  })


  verifyEmailSubmit():void{

    let emailValue = this.verifyEmailForm.get('email')?.value
    this.resetPassForm.get('email')?.patchValue(emailValue)
   

    this.authService.verifyEmail(this.verifyEmailForm.value).subscribe({
      
      next:(res)=>{
        console.log(res);
        if(res.statusMsg=== 'success'){
          this.step=2;
        }
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
  }



  verifyCodeSubmit():void{
    this.authService.verifyCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === "Success"){

          this.step=3;
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  resetPassSubmit():void{
    this.isLoading=true;
    this.authService.resetPassword(this.resetPassForm.value).subscribe({
      next:(res)=>{
        console.log(res);
 
        localStorage.setItem('userToken', res.token);

        this.authService.saveUserData();

        this.router.navigate(['/home'])

        this.isLoading=false;
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
