import { Component, inject, OnInit } from '@angular/core';

import { Ibrands } from '../../shared/interfaces/ibrands';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermPipe } from '../../core/pipes/term.pipe';
import { BrandsService } from '../../core/services/brands.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [ RouterLink ,FormsModule ,TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{


  private readonly brandsService=inject(BrandsService)
  private readonly ngxSpinnerService=inject(NgxSpinnerService)


    brands:Ibrands[]=[];

    text:string=""



  getBrandsData():void{
    this.ngxSpinnerService.show('loading-2')
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);

        this.brands =res.data;

        this.ngxSpinnerService.hide('loading-2')
        
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


  ngOnInit(): void {
      this.getBrandsData();
  }

}
