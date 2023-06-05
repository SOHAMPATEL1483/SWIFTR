import { redirect, type Actions, error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import { element } from "svelte/internal";

export const load: PageServerLoad = async ({ locals }) =>
{
    const session = await locals.auth.validate();
    if (!session)
        throw error(404, "you must be logged in to view this page");
    try
    {
        const items = await prisma.cartItem.findMany({
            where: {
                UserId: session.userId
            },
            include: {
                Service: true,
            }
        });
        return { items };
    } catch (error)
    {
        console.error(error);
        return { msg: "some error occured" };
    }

}

export const actions: Actions = {
    removeItem: async ({ locals, request }) =>
    {
        const session = await locals.auth.validate();

        const formdata = await request.formData();
        const ServiceId = formdata.get("id");
        const quantity: any = formdata.get("quantity");
        try
        {
            if (quantity > 1)
            {
                const item = await prisma.cartItem.update({
                    where: {
                        UserId_ServiceId: {
                            UserId: session?.userId as string,
                            ServiceId: ServiceId as string,
                        }
                    },
                    data: {
                        quantity: {
                            decrement: 1,
                        }
                    }
                })
            }
            else
            {
                await prisma.cartItem.delete({
                    where: {
                        UserId_ServiceId: {
                            UserId: session?.userId as string,
                            ServiceId: ServiceId as string,
                        }
                    }
                });
            }
            return { msg: "successfully removed item from cart" };

        } catch (error)
        {
            console.log(error);
            return fail(404, { msg: "some error occured" })
        }

    },
    checkout: async ({ locals }) =>
    {
        const session = await locals.auth.validate();
        let success = false;
        if (!session)
            throw error(404, "you must be logged in to view this page");
        try
        {
            const cartitems = await prisma.cartItem.findMany({
                where: {
                    UserId: session?.userId
                },
                include: {
                    Service: true,
                }
            });
            if (cartitems.length == 0)
                return;
            let myDate = new Date();
            myDate.setDate(myDate.getDate() + 1);
            const order = await prisma.order.create({
                data: {
                    deliveryDate: myDate,
                    UserId: session.userId,
                    convinienceFee: 0,
                    total: 0,
                    subtotal: 0,
                }
            });
            let subtotal = 0;
            for (const item of cartitems)
            {
                subtotal += item.quantity * item.Service.price;
                const newOrderItem = await prisma.orderItem.create({
                    data: {
                        quantity: item.quantity,
                        ServiceId: item.ServiceId,
                        OrderId: order.id,
                    }
                });
            };
            const new_order = await prisma.order.update({
                where: {
                    id: order.id,
                },
                data: {
                    subtotal: subtotal,
                    convinienceFee: Math.ceil(subtotal * 0.05),
                    total: Math.ceil(subtotal * 0.05) + subtotal,
                }

            });
            await prisma.cartItem.deleteMany({
                where: {
                    UserId: session.userId,
                }
            });
            success = true;
        } catch (error)
        {
            console.error(error);
        }
        if (success)
            throw redirect(307, "/user");

    }

};