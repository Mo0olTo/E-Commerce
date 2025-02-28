import { AllordersComponent } from './pages/allorders/allorders/allorders.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' , pathMatch:"full"} ,

    {path:'', component:AuthLayoutComponent ,canActivate:[loggedGuard] , children:[
        {path:'login' , component:LoginComponent , title:"Login"},
        {path:'register' , component:RegisterComponent , title:'Register'},
        {path:'forgot' , component:ForgotpasswordComponent , title:'ForgotPassword'},
    ]},
    {path:'', component:BlankLayoutComponent , canActivate:[authGuard] , children:[
        {path:'home' , loadComponent:()=> import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:'Home'},
        {path:'cart' , loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) , title:'Cart'},
        {path:'products' , loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent), title:'Products'},
        {path:'brands' , loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent) , title:'Brands'},
        {path:'allorders' , loadComponent:()=>import('./pages/allorders/allorders/allorders.component').then((c)=>c.AllordersComponent) , title:'All Orders'},
        {path:'categories' , loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title:'Categories'},
        {path:'checkout/:id' , loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title:'Checkout'},
        {path:'wishlist' , loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent) , title:'Wishlist'},
        {path:'details/:id' , loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent) , title:'Details'},
        {path:'**', component:NotfoundComponent}
    ]},
    
];
