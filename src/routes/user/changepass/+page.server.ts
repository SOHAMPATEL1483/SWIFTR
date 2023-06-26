import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';
import z, { ZodError } from "zod";

const passwordSchema = z.string()
    .regex(new RegExp(".*[A-Z].*"), "atleast one uppercase character required")
    .regex(new RegExp(".*[a-z].*"), "atleast One lowercase character required")
    .regex(new RegExp(".*\\d.*"), "atleast One number required")
    .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "atleast One special character required"
    )
    .min(8, "Must be at least 8 characters in length");

export const load: PageServerLoad = async ({ locals }) =>
{
    const session = await locals.auth.validate();
    if (!session)
        throw error(400, "you must be logged in to view this page");
};

export const actions: Actions = {
    changePassword: async ({ request, locals }) =>
    {
        const { session, user } = await locals.auth.validateUser();
        const data: any = Object.fromEntries(await request.formData());
        let success = false;
        console.log(user);
        try
        {
            const validated_password = passwordSchema.parse(data.newPassword);
            const oldkey = await auth.useKey("email", user.email, data.oldPassword);
            const key = await auth.updateKeyPassword("email", user.email, validated_password);
            console.log(key);
            await auth.invalidateAllUserSessions(user.id);
            success = true;

        }
        catch (e)
        {
            if (e instanceof LuciaError)
            {
                if (e.message === "AUTH_INVALID_KEY_ID")
                    return fail(400, { msg: "please enter right password" });
            }
            if (e instanceof ZodError)
            {
                const { formErrors } = e.flatten();
                return fail(400, { msg: formErrors[0] });
            }
            // console.error(e);
            throw error(400, "some error occured");
        }
        if (success)
            throw redirect(302, "/login");
    }
};