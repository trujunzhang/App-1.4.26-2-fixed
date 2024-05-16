/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable rulesdir/no-inline-named-export */
import * as FileSystem from 'expo-file-system';

export class CloudinaryUtils {
    // Upload photo file to cloudinary server.
    // https://pub.dev/packages/cloudinary_sdk
    static uploadToCloudinary = async (imagePath: string): Promise<string> => {
        const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

        const base64 = await FileSystem.readAsStringAsync(`file://${imagePath}`, {
            encoding: 'base64',
        });
        const base64Img = `data:image/jpg;base64,${base64}`;
        const data = {
            file: base64Img,
            upload_preset: 'ieatta',
        };

        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        // .then(async r => {
        //   const response = await r.json()
        //   // console.log(response.secure_url)
        //   console.log('response:', response)
        //   return response.secure_url
        // })
        // .catch(err => {
        //   console.log('Cloudinary<error>:', err)
        // })

        const json = await response.json();
        return json.secure_url;
    };
}
