import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ cookies, fetch, url }) =>
{
    let query = url.searchParams.get('search');
    if (!query) query = "";
    try
    {
        const services = await prisma.service.findMany({
            where: {
                name: {
                    startsWith: query,
                    mode: 'insensitive',
                }
            },
            include: {
                Seller: true,
            }
        });
        return { services };
    } catch (error)
    {
        console.error(error);
    }

}