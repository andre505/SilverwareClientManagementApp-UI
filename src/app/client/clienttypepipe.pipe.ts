import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientType'
})
export class ClientTypePipe implements PipeTransform {
    transform(n: number) {
        return n == 0 ? "Customer" : "Integration Partner";
  }
}
