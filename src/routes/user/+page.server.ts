import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) =>
{
    const session = await locals.auth.validate();
    if (!session)
        throw error(400, "you must login to view this page");

    try
    {
        const orders = await prisma.order.findMany({
            where: {
                UserId: session.userId,
            },
            include: {
                OrderItem: {
                    include: {
                        Service: true,
                    }
                },
            }

        });
        return { orders };
    } catch (error)
    {

    }
};