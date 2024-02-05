import { check } from "express-validator";

export const RegisterSchema = [
    check('name').trim().isAlpha().withMessage("Name Should Be Alphabet Only"),
    check('username','username is required').exists().isAlphanumeric().withMessage('Username should be alphanumeric character only').trim().isLength({miin:6,max:32}),
    check('password','Password is required').exists().isLength({min:6,max:100}).trim(),
    check('email','email is required').exists().isEmail()
]