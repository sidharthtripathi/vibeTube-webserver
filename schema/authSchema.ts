import z from 'zod'
export const loginSchema = z.object({
    username : z.string().min(1),
    password : z.string().min(8,"password must be min 8 characters")
})
export const signupSchema = loginSchema
export type User = {
    username : string,
    id : string
}