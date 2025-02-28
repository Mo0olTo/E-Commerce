import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet,NavbarComponent,FooterComponent ],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

  private readonly router=inject(Router);



  isButtonVisible: boolean = false;
  goUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    
    this.isButtonVisible = window.scrollY > 100;
  }

  toCart():void{
    this.router.navigate(['/cart'])
  }
  toWishlist():void{
    this.router.navigate(['/wishlist'])
  }


}
