import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'favoriteText'
})

export class FavoriteTextPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (args) {
            return value + '\u2605';    // 0x2605 (9733 decimal) : unicode black star. See https://www.w3schools.com/charsets/ref_utf_symbols.asp
        }
        else {
            return value;
        }
    }

}
