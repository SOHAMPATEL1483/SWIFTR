import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import { ZodError, z } from 'zod';

const User = z.object({
    name: z.string().min(8, "username must be atleast 8 character long"),
    email: z.string().email("This must be valid email"),
    password: z.string().min(8, "password must be atleast 8 character long").regex(new RegExp(`^(?=.*[A-Z])(?=.*\d).*$`), "password must contain at least 1 uppercase and 1 digit"),
    phone: z.string().length(10, "phone no must be of length 10"),
    address: z.string(),
    role: z.enum(["ADMIN", "CUSTOMER", "PROVIDER"]),
    state: z.string(),
    city: z.string(),
});


export const actions: Actions = {
    signup: async ({ cookies, request, locals }) =>
    {
        let formdata: any = Object.fromEntries(await request.formData());
        try
        {
            const validated_data = User.parse(formdata);
            delete formdata.password;
            delete formdata.email;
            const user = await auth.createUser({
                primaryKey: {
                    providerId: "username",
                    providerUserId: validated_data.name,
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
                let error: Record<string, string> = {};
                e.errors.forEach((c) =>
                {
                    if (c)
                        error[c.path[0]] = c.message;
                });
                console.error(error);
                return fail(400, error);
            }
            return fail(400, { msg: "something wrong happened" });
        }
        if (await locals.auth.validate())
            throw redirect(302, "/services");
    }
};