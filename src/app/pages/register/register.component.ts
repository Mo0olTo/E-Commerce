import { Component, inject } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm:FormGroup = new FormGroup({
  name:new FormControl(null ,[Validators.required , Validators.minLength(3) ,Validators.maxLength(20)]),
  email:new FormControl(null , [Validators.required , Validators.email]),
  password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)]),
  rePassword:new FormControl(null ,[Validators.required]),
  phone:new FormControl(null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)])

} , {validators:this.confirmPassword})


  isLoading:boolean=false;
  msgError:string='';
  msgSuccess:string='';


 private readonly authService = inject(AuthService)
 private readonly router = inject(Router)





submitForm():void{
  if(this.registerForm.valid){

    this.isLoading=true;

    this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){

         setTimeout(() => {
          this.router.navigate(['/login']);
         }, 3500); 
        
        this.msgSuccess = res.message
        }

        
        this.isLoading=false;

        
      }, error:(err:HttpErrorResponse) =>{
        console.log(err);

        this.msgError = err.error.message

        this.isLoading=false;
        
      }
    })
  }
  
}




// custome Validation>>>>>>>>>

confirmPassword(group:AbstractControl){

  const password=group.get('password')?.value;
  const rePassword=group.get('rePassword')?.value;

  return password === rePassword ? null : {mismatch:true} ;

}

}
