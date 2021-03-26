import React from 'react'
import Helper from '../Input/InputHelper';

describe('Testing on InputHelper File', () => {
    test('should hanlde Good element', () => {
        const element = {
            id: "newOrderName",
            placeholder: "Enter the Order Name",
            type: "text",
            valid: true,
            validationText: "This is a required field",
            validations: { isRequired: true },
            value: "New Order 2"
        };
        expect(Helper.validate(element)).toBe(true);

    })
    test('should handle noValidation element', () => {
        const element = {
            id: "newOrderName",
            placeholder: "Enter the Order Name",
            type: "text",
            valid: true,
            validationText: "This is a required field",
            validations: { isRequired: false },
            value: "New Order 2"
        };
        expect(Helper.validate(element)).toBe(true);
    })
    test('should handle no Validation element', () => {
        const element = {
            id: "newOrderName",
            placeholder: "Enter the Order Name",
            type: "text",
            valid: true,
              validations: { isRequired: true },
            validationText: "This is a required field",
        };
        expect(Helper.validate(element)).toBe(false);
    })

})
