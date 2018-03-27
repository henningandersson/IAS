import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgFilterPipe', pure: false })

export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: any): any[] {
        if (!items) {
            return [];
        }

        return items.filter(it => it[field].toString().toLowerCase() === value.toString().toLowerCase());
    }
}
