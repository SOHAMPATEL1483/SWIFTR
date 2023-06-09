import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

import type { RequestHandler } from './$types';
import stripe from '$lib/server/stripe';
import prisma from '$lib/server/prisma';

// stripe listen --forward-to localhost:5173/api/stripe
// endpoint to handle incoming webhooks
export const POST: RequestHandler = async ({ request }) =>
{
    // extract body
    const body = await request.text();

    // get the signature from the header
    const signature = request.headers.get('stripe-signature')!;
    // console.log(signature);
    // console.log(body);
    // console.log(env.ENDPOINT_SECRET);

    // var to hold event data
    let event

    // verify it
    try
    {
        event = stripe.webhooks.constructEvent(body, signature, env.ENDPOINT_SECRET)
    } catch (err: any)
    {
        // signature is invalid!
        console.warn('⚠️  Webhook signature verification failed.', err.message)

        // return, because it's a bad request
        throw error(400, 'Invalid request')
    }

    // console.log(event);
    // signature has been verified, so we can process events
    // full list of events: https://stripe.com/docs/api/events/list
    if (event.type == 'checkout.session.completed')
    {
        // get data object
        //@ts-ignore
        console.log(event.data.object.metadata.orderid);
        await prisma.order.update({
            //@ts-ignore
            where: { id: event.data.object.metadata.orderid, },
            data: { status: 'COMPLETED' },
        });
        console.log(`✅ Charge succeeded`);
    }

    // return a 200 with an empty JSON response
    return json({});
}