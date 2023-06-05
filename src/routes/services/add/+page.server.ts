import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { env } from '$env/dynamic/private';

cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: false,
});

async function upload(file: File)
{
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer) //  <-- convert to Buffer

    return new Promise((resolve, reject) =>
    {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, onDone).end(buffer)

        function onDone(error: any, result: any)
        {
            if (error)
            {
                return reject({ success: false, error });
            }
            return resolve({ success: true, result })
        }
    });
}
export const load: PageServerLoad = async ({ locals }) =>
{
    const session = locals.auth.validate();
    if (!session)
        throw error(400, "you must be logged in to view this page");

};

export const actions: Actions = {
    AddService: async ({ request, locals }) =>
    {
        let success = false;
        const { session, user } = await locals.auth.validateUser();
        let formdata: any = Object.fromEntries(await request.formData());
        formdata.price = Number(formdata.price);
        try
        {
            const uplaoded_image: any = await upload(formdata.image as File);
            console.log(uplaoded_image.result.secure_url);
            formdata.image = uplaoded_image.result.secure_url;
            console.log(formdata);
            const service = await prisma.service.create({
                data:
                {
                    ...formdata,
                    Sellerid: user.id
                }
            });
            success = true;
        } catch (error)
        {
            console.log(error);
        }
        if (success)
            throw redirect(302, "/services");
    }
};