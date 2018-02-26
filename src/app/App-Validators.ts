import { AbstractControl, ValidationErrors } from '@angular/forms';
export class AppValidators {
    // Custom validator to check departure and arrival date
    /*
        static checkArrDate(control: AbstractControl): { [s: string]: boolean } {
            const group = control.parent;
            if (group && control.value) {
                const arr = control.value;
                const dep = group.controls['departure'].value;
            if (arr.substring(0, 4) > dep.substring(0, 4))  {
                return null;
                } else if (arr.substring(0, 4) === dep.substring(0, 4)) {
                            if (arr.substring(5, 7) > dep.substring(5, 7)) {
                                return null;
                            } else if (arr.substring(5, 7) === dep.substring(5, 7)) {
                                        if (arr.substring(8, 10) > dep.substring(8, 10)) {
                                                return null;
                                            } else if (arr.substring(8, 10) === dep.substring(8, 10)) {
                                                        return null;
                                                    } else {
                                                    return { checkArrDate: true};
                                                        }
            }
        }
    }
} */
// custom validator to check departure and arrival date
    static dateMatch(firstControlName, secondControlName) {
        return (AC: AbstractControl) => {
            const dep = AC.get(firstControlName).value; // to get value in input tag
            const arr = AC.get(secondControlName).value; // to get value in input tag
            if (dep && arr) {
            if (arr.substring(0, 4) > dep.substring(0, 4)) {
                return null;
            } else if (arr.substring(0, 4) === dep.substring(0, 4)) {
                if (arr.substring(5, 7) > dep.substring(5, 7)) {
                    return null;
                } else if (arr.substring(5, 7) === dep.substring(5, 7)) {
                    if (arr.substring(8, 10) > dep.substring(8, 10)) {
                        return null;
                    } else if (arr.substring(8, 10) === dep.substring(8, 10)) {
                        return null;
                    } else {
                        return { checkArrDate: true };
                    }
                }
            }
        }
        };
    }
// custom validator to check from and to location
    static locationMatch(firstControlName, secondControlName) {
        return (AC: AbstractControl) => {
            const firstControlValue = AC.get(firstControlName).value; // to get value in input tag
            const secondControlValue = AC.get(secondControlName).value; // to get value in input tag
            if (firstControlValue && secondControlValue) {
            if (firstControlValue === secondControlValue) {
                AC.get(secondControlName).setErrors({ MatchFields: true });
               // console.log(true);
            } else {
               // console.log(false);
                return null;
            }
        }
        };
    }
}