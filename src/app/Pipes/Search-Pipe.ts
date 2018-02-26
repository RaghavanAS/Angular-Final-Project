import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchBy',
    pure: false
})
export class SearchPipe implements PipeTransform {
// invoking transform method which accepts the item list, search value and returns the matching items
    transform(items: any[], field: string, value: string): any[] {
        // display nothing if item list is empty
        if (!items) {
            return [];
        }
        // retun all the items if nothing is entered
        if (!value) {
            return items;
        }
        // return matching Items
        return items.filter(it => it[field] === value);
    }
}
