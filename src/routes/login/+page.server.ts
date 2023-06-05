import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import { ZodError, z } from "zod";


const User = z.object({
    username: z.string().min(8, "username must be atleast 8 character long"),
    password: z.string().min(8, "password must be atleast 8 character long").regex(new RegExp(`^(?=.*[A-Z])(?=.*\d).*$`), "password must contain at least 1 uppercase and 1 digit"),
});


export const actions: Actions = {
    signin: async ({ request, locals }) =>
    {
        let formdata: any = Object.fromEntries(await request.formData());
        try
        {
            const validated_user = User.parse(formdata);
            const key = await auth.useKey("username", validated_user.username, validated_user.password);
            const session = await auth.createSession(key.userId);
            locals.auth.setSession(session);
        }
        catch (e: any)
        {
            if (e instanceof LuciaError)
                return fail(400, { msg: "You have entered an invalid username or password" });
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
        }
        if (await locals.auth.validate())
            throw redirect(302, "/services");


    },
    logout: async ({ locals }) =>
    {
        const session = await locals.auth.validate();
        if (session)
            await auth.invalidateSession(session.sessionId);
        throw redirect(307, "/");
    }

};