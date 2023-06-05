import { error, fail, json, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ fetch, params, locals }) =>
{
    const session = await locals.auth.validate();
    if (!session)
        throw error(400, "you must login to view this page");
    try
    {
        const service = await prisma.service.findUnique({
            where: {
                id: params.slug,
            },
            include: {
                Seller: true,
            }
        });
        const comments = await prisma.comments.findMany({
            where: {
                ServiceId: params.slug,
            },
            include: {
                User: true,
            }
        })
        return { service, comments };
    } catch (error)
    {
        console.log(error);
    }
}

export const actions: Actions = {
    AddCartItem: async ({ locals, params }) =>
    {
        const session = await locals.auth.validate();
        if (!session)
            throw error(404, "you must be logged in to view this page");
        try
        {
            const cartitem = await prisma.cartItem.upsert({
                where: {
                    UserId_ServiceId: {
                        ServiceId: params.slug,
                        UserId: session.userId,
                    }
                },
                update: {
                    quantity: {
                        increment: 1,
                    }
                },
                create: {
                    ServiceId: params.slug,
                    UserId: session.userId,
                    quantity: 1,
                }
            })
            return { 'msg': 'Successfully added to cart' };
        } catch (error)
        {
            console.log(error);
        }
    },
    PostReview: async ({ request, params, locals }) =>
    {
        const { session, user } = await locals.auth.validateUser();
        if (!session)
            throw error(400, "you must login to post review");
        let formdata: any = Object.fromEntries(await request.formData());
        formdata.rating = parseInt(formdata.rating);
        console.log(formdata);
        try
        {
            const comment = await prisma.comments.create({
                data: {
                    ...formdata,
                    UserId: user.id,
                    ServiceId: params.slug,
                }
            });
            console.log(comment);
        } catch (error)
        {
            console.log(error);
        }

    },
    RemoveService: async ({ params, fetch }) =>
    {
        await prisma.service.delete({
            where: {
                id: params.slug,
            }
        });
        throw redirect(301, "/services");
    },
    PlaceOrder: async ({ request, locals, params }) =>
    {
        const session = await locals.auth.validate();
        if (!session) return fail(400);
        let price: any = (await request.formData()).get("price");
        price = parseInt(price);
        try
        {

            let myDate = new Date();
            myDate.setDate(myDate.getDate() + 1);
            const order = await prisma.order.create({
                data: {
                    UserId: session.userId,
                    deliveryDate: myDate,
                    subtotal: price,
                    convinienceFee: Math.ceil(price * 0.05),
                    total: price + Math.ceil(price * 0.05),
                }
            });
            const item = await prisma.orderItem.create({
                data: {
                    quantity: 1,
                    OrderId: order.id,
                    ServiceId: params.slug,
                }
            });
        } catch (error)
        {
            console.log(error);
        }
    }

};

