import { Pipe, PipeTransform } from '@angular/core';
import { ServicesService } from './services.service';
import { Trip } from './models';
import { outputAst } from '@angular/compiler';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {
    service: any
    constructor(service: ServicesService){
      this.service = service
    }

  transform(value: Trip[], name: string, minrate: number, maxrate: number, minprice: number, maxprice: number) {
    if (!value)
        return [];
    if (!name)
        return value;
    name = name.toLowerCase();

    return value.filter(Trip => {
        return Trip.country.toLowerCase().includes(name) && 
        Trip.unitPrice > minprice && Trip.unitPrice < maxprice;
    });}

}