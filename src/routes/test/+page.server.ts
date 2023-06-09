import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import stripe from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';
import { number } from 'zod';



export const actions: Actions = {
    testaction: async ({ request, locals }) =>
    {
        const session = await locals.auth.validate();
        if (!session)
            throw error(400, "you must be logged in to use this action");
        let line_items = [{
            price_data: {
                currency: "inr",
                unit_amount: 100,
                product_data: {
                    name: 'name',
                },
            },
            quantity: 1,
        }];
        const stripe_session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "KE", "IN"],
            },
            line_items,
            mode: "payment",
            metadata: {
                t: 'this is metadata testing',
                b: 1,
            },
            success_url: `http://localhost:5173/success`,
            cancel_url: `http://localhost:5173/cancel`,
        });

        console.log(stripe_session.url);
        throw redirect(302, stripe_session.url as string);
    },
};