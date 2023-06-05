import type { Actions, PageServerLoad } from './$types';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { env } from '$env/dynamic/private';

cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: false,
});

export const actions: Actions = {
    testaction: async ({ request }) =>
    {
        let formdata = await request.formData();
        let image = formdata.get('image') as File;
        let buffer = Buffer.from(await image.arrayBuffer());
        console.log(buffer)
        // // console.log(image);
        cloudinary.uploader.upload_stream({ resource_type: "image" }, onDone).end(buffer);
        function onDone(error: any, result: any)
        {
            console.log(error);
            console.log(result.secure_url);
        }

    },
};