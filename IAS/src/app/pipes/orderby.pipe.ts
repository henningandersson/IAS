﻿import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgOrderByPipe', pure: false })

export class OrderByPipe implements PipeTransform {

    private static orderByComparator(a: any, b: any): number {
        if (a === undefined || b === undefined || !a || !b) {
            return 0;
        }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            // Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            }

            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        } else {
            // Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) {
                return -1;
            }

            if (parseFloat(a) > parseFloat(b)) {
                return 1;
            }
        }

        return 0; // equal each other
    }

    transform(input: any, config: any): any {
        if (!Array.isArray(input)) {
            return input;
        }
        
        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            const propertyToCheck = !Array.isArray(config) ? config : config[0];
            const desc = propertyToCheck.substr(0, 1) === '-';

            // Basic array
            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc ? input.sort() : input.sort().reverse();
            } else {
                const property = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return input.sort((a: any, b: any) => {
                    return !desc ?
                        OrderByPipe.orderByComparator(a[property], b[property])
                        :
                        -OrderByPipe.orderByComparator(a[property], b[property]);
                });
            }
        } else {
            // Loop over property of the array in order and sort
            return input.sort((a: any, b: any) => {
                for (let i = 0; i < config.length; i++) {
                    const desc = config[i].substr(0, 1) === '-';
                    const property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];

                    const comparison = !desc ?
                        OrderByPipe.orderByComparator(a[property], b[property])
                        :
                        -OrderByPipe.orderByComparator(a[property], b[property]);

                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0) {
                        return comparison;
                    }
                }

                return 0; // equal each other
            });
        }
    }
}
