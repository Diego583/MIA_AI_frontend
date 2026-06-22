import * as z from "zod";

export const ContactSupportSchema = z.object({
    subject: z
        .string()
        .min(3, { message: "Subject must be at least 3 characters long" }),
    message: z
        .string()
        .min(5, { message: "Message must be at least 5 characters long" }),
    // files: z.any().optional(),
    replyTo: z.string().email(),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
});

export const EditAccountSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Name cannot be empty" })
        .refine((value) => value.trim().length > 0, {
            message: "Name cannot be just whitespaces",
        }),
    lastName: z.string().optional(),
    birthDate: z.coerce.date().refine(
        (date) => {
            const ageDiff = Date.now() - date.getTime();
            const ageDate = new Date(ageDiff);
            return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
        },
        { message: "You must be at least 18 years old." }
    ),
    // gender: z.string().optional(),
});

export const WaifuSettingsSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name cannot be empty" })
        .refine((value) => value.trim().length > 0, {
            message: "Name cannot be just whitespaces",
        }),
    age: z.number().min(18).max(100),
    occupation: z
        .string()
        .min(1, { message: "Occupation cannot be empty" })
        .refine((value) => value.trim().length > 0, {
            message: "Occupation cannot be just whitespaces",
        }),
    hobbies: z.string(),
    skills: z.string(),
    personalityTraits: z
        .string()
        .min(1, { message: "Personality traits cannot be empty" })
        .refine((value) => value.trim().length > 0, {
            message: "Personality traits cannot be just whitespaces",
        }),
    favoriteFoods: z.string(),
    favoriteMusicGenre: z.string(),
    height: z.string(),
    build: z.string(),
    hair: z.string(),
    eyes: z.string(),
    complexion: z.string(),
    ethnicity: z.string(),
});
