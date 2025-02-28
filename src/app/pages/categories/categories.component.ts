import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  private readonly categoriesService=inject(CategoriesService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);

    myId=localStorage.getItem('userToken')


   categories:Icategories[]=[]
    catSpecId:string="";


  ngOnInit():void {
      this.getCategoriesData()
     



      
      
      
      
  }


  getCategoriesData():void{
    this.ngxSpinnerService.show('loading-2')
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);

        this.categories=res.data

       
        this.ngxSpinnerService.hide('loading-2')
        
        
        
        
      }, error:(err)=>{
        console.log(err);
        
      }
    })
  }


  getSpecificCatData(id:string|null):void{
    this.categoriesService.getSpecificCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
        
      }, error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
