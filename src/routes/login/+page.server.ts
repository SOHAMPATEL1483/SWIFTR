import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import { ZodError, z } from "zod";


const User = z.object({
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
});


export const actions: Actions = {
    signin: async ({ request, locals }) =>
    {
        let formdata: any = Object.fromEntries(await request.formData());
        try
        {
            const validated_user = User.parse(formdata);
            const key = await auth.useKey("email", validated_user.email, validated_user.password);
            const session = await auth.createSession(key.userId);
            locals.auth.setSession(session);
        }
        catch (e: any)
        {
            if (e instanceof LuciaError)
                return fail(400, { msg: "You have entered an invalid username or password" });
            if (e instanceof ZodError)
            {
                const { fieldErrors } = e.flatten();
                return fail(400, { error: fieldErrors });
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