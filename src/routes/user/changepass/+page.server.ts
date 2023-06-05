import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) =>
{

};

export const actions: Actions = {
    changePassword: async ({ request, fetch }) =>
    {
    }
};