import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayObject:any[] , text:string):any[] {

    return arrayObject.filter(  (item)=> item.title.toLowerCase().includes(text.toLowerCase() )  );
  }

}
