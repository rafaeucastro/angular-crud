import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case "front-end": return "code"
      case "front-end": return "computer"
    }

    return "code";
  }

}
