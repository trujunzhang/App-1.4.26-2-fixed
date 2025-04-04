/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */
import Log from '@libs/Log';
import Config from '@src/CONFIG';
import type ICloudinaryUtils from './types';

// https://pub.dev/packages/cloudinary_sdk
class CloudinaryUtils implements ICloudinaryUtils {
    async readAsBase64FromBlob(blobHttps: string): Promise<string | undefined> {
        const data = await fetch(blobHttps);
        const blob = await data.blob();
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                return resolve(base64String);
            };
        });
    }

    readAsBase64FromExpoFileSystem(fileUri: string): Promise<string> {
        return Promise.resolve('');
    }

    readAsBase64(fileUriOrBlobHttps: string): Promise<string | undefined> {
        return this.readAsBase64FromBlob(fileUriOrBlobHttps);
    }

    async uploadToCloudinary(base64: string): Promise<string | undefined> {
        const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${Config.CLOUDINARY_CLOUD_NAME}/image/upload`;

        Log.info('');
        Log.info('================================');
        // Log.info(`image path in the cloudinary utils: ${imagePath}`);
        Log.info(`cloudinary url the cloudinary utils: ${CLOUDINARY_URL}`);
        Log.info('================================');
        Log.info('');

        const data = {
            file: base64,
            upload_preset: Config.CLOUDINARY_CLOUD_UPLOAD_PRESET,
        };

        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const json: {secure_url: string} = await response.json();
        return json.secure_url;
    }
}

export default CloudinaryUtils;
