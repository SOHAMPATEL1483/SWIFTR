import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import { ZodError, z } from 'zod';

const User = z.object({
    name: z.string().min(8, "username must be atleast 8 character long"),
    email: z.string().email("This must be valid email"),
    password: z.string()
        .regex(new RegExp(".*[A-Z].*"), "atleast one uppercase character required")
        .regex(new RegExp(".*[a-z].*"), "atleast One lowercase character required")
        .regex(new RegExp(".*\\d.*"), "atleast One number required")
        .regex(
            new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
            "atleast One special character required"
        )
        .min(8, "Must be at least 8 characters in length"),
    phone: z.string().length(10, "phone no must be of length 10"),
    address: z.string(),
    role: z.enum(["ADMIN", "CUSTOMER", "PROVIDER"]),
    state: z.string(),
    city: z.string(),
});


export const actions: Actions = {
    signup: async ({ request, locals }) =>
    {
        let formdata: any = Object.fromEntries(await request.formData());
        try
        {
            const validated_data = User.parse(formdata);
            delete formdata.password;
            const user = await auth.createUser({
                primaryKey: {
                    providerId: "email",
                    providerUserId: validated_data.email,
                    password: validated_data.password,
                },
                attributes: {
                    ...formdata
                }
            });
            const session = await auth.createSession(user.id);
            locals.auth.setSession(session);
        } catch (e)
        {
            console.error(e);
            if (e instanceof LuciaError)
            {
                if (e.message === "AUTH_DUPLICATE_KEY_ID")
                    return fail(400, { msg: "User with given username already exists" });

            }
            if (e instanceof ZodError)
            {
                const { fieldErrors } = e.flatten();
                return fail(400, { error: fieldErrors });
            }
            return fail(400, { msg: "something wrong happened" });
        }
        if (await locals.auth.validate())
            throw redirect(302, "/services");
    }
};