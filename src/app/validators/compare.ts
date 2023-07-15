import { FormGroup } from '@angular/forms';

export function CompareValidator(controlA: string, controlB: string) {
    return function (group: FormGroup) {
        const controlARef = group.get(controlA)
        const controlBRef = group.get(controlB)

        if (controlARef && controlBRef && controlARef.value !== controlBRef.value) {
            return {
                compare: { a: controlARef.value, b: controlBRef.value }
            }
        }
        return null;
    }
}