/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */
import * as FileSystem from 'expo-file-system';
import Log from '@libs/Log';
import Config from '@src/CONFIG';
import type ICloudinaryUtils from './types';

// https://pub.dev/packages/cloudinary_sdk
class CloudinaryUtils implements ICloudinaryUtils {
    readAsBase64FromBlob(blobHttps: string): Promise<string | undefined> {
        return Promise.resolve(undefined);
    }

    async readAsBase64FromExpoFileSystem(fileUri: string): Promise<string> {
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: 'base64',
        });
        const base64Img = `data:image/jpg;base64,${base64}`;
        return base64Img;
    }

    readAsBase64(fileUriOrBlobHttps: string): Promise<string | undefined> {
        return this.readAsBase64FromExpoFileSystem(fileUriOrBlobHttps);
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
