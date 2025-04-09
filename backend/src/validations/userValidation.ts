import { z } from 'zod'

const usernameRequirements = {
    min: 'Username must be at least 3 characters',
    max: 'Username must be at most 10 characters'
}
const passwordRequirements = {
    min: "Password must be at least 8 characters",
    max: "Password must be at most 20 characters",
    uppercase: "Must contain at least one uppercase letter (A-Z)",
    lowercase: "Must contain at least one lowercase letter (a-z)",
    number: "Must contain at least one number (0-9)",
    special: "Must contain at least one special character (!@#$%^&*)",
};

export const signupSchema = z.object({
    username: z.string().min(3, usernameRequirements.min).max(10, usernameRequirements.max),
    password: z.string().min(8, passwordRequirements.min)
        .max(20, passwordRequirements.max)
        .regex(/[A-Z]/, passwordRequirements.uppercase)
        .regex(/[a-z]/, passwordRequirements.lowercase)
        .regex(/[0-9]/, passwordRequirements.number)
        .regex(/[!@#$%^&*]/, passwordRequirements.special)
})

export const signinScehma = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20)
})