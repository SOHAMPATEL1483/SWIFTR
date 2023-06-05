import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) =>
{
    let authuser = {
        isLoggedIn: false,
        name: "",
        id: "",
    }
    const { session, user } = await locals.auth.validateUser();
    if (session)
    {
        authuser.isLoggedIn = true;
        authuser.name = user.name;
        authuser.id = user.id;
    }
    return { authuser };

};
