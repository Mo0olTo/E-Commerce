import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { MytranslateService,  } from '../../core/services/mytranslate/mytranslate.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive ,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  private readonly authService=inject(AuthService);
  private readonly cartService=inject(CartService);
  private readonly mytranslateService=inject(MytranslateService)
  private readonly translateService=inject(TranslateService)

 

  isLogin=input<Boolean>(true)


  cartCount:Signal<number> = computed( ()=> this.cartService.cartNumber() )
  
  constructor(private flowbiteService: FlowbiteService) {}
  
    ngOnInit(): void {
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          console.log("yes" , res);

          this.cartService.cartNumber.set(res.numOfCartItems)
          
        }
      })




      this.flowbiteService.loadFlowbite(flowbite => {
       
      });

      

      }


        logOut():void{
          this.authService.logOut();
          }



          changeLang(lang:string):void{

            this.mytranslateService.changeLang(lang)

          }

          changedDir(lang:string):boolean{
            return this.translateService.currentLang === lang
          }


          
}
