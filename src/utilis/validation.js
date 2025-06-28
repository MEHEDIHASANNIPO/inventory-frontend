import {
    Form as VeeForm,  
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure,
} from 'vee-validate';

import {
    required,
    email,
    min,
    max,
    alpha_spaces as alphaSpaces,
    min_value as minVal,
    max_value as maxVal,
    confirmed,
    not_one_of as excluded,
    url
} from '@vee-validate/rules';


export default {
    install(app) {
        app.component('VeeForm', VeeForm)
        app.component('VeeField', VeeField)
        app.component('ErrorMessage', ErrorMessage)

        defineRule('required', required)
        defineRule('checkbox', required)
        defineRule('email', email)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('alpha_spaces', alphaSpaces)
        defineRule('min_value', minVal)
        defineRule('max_value', maxVal)
        defineRule('password_mismatch', confirmed)
        defineRule('excluded', excluded)
        defineRule('url', url)

        configure({
            generateMessage: (ctx) => {
                const message = {
                    required: `The field ${ctx.field} is required`,
                    checkbox: `The field ${ctx.field} must be selected`,
                    email: `The field ${ctx.field} must be a valid email address`,
                    min: `The field ${ctx.field} is too short`,
                    max: `The field ${ctx.field} is too long`,
                    alpha_spaces: `The field ${ctx.field} may only contains alphabatical characters and spaces`,
                    min_value: `The field ${ctx.field} is too low`,
                    max_value: `The field ${ctx.field} is too high`,
                    password_mismatch: `Password didn't matched!`,
                    excluded: `You are now allowed to use this value for the field ${ctx.field}.`,
                    url: `The field ${ctx.field} must be a valid url`,
                }

                return message[ctx.rule.name] || `The feild ${ctx.field} is invalid!`;
            }
        })
    }
}