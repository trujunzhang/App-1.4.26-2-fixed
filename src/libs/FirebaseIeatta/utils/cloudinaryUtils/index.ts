/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable import/prefer-default-export */

/* eslint-disable rulesdir/no-inline-named-export */
import * as FileSystem from 'expo-file-system';
import Log from '@libs/Log';
import Config from '@src/CONFIG';

// https://pub.dev/packages/cloudinary_sdk
export class CloudinaryUtils {
    static uploadToCloudinary = (imagePath: string): Promise<string> => {
        const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${Config.CLOUDINARY_CLOUD_NAME}/image/upload`;

        Log.info('');
        Log.info('================================');
        Log.info(`image path in the cloudinary utils: ${imagePath}`);
        Log.info(`cloudinary url the cloudinary utils: ${CLOUDINARY_URL}`);
        Log.info('================================');
        Log.info('');

        return FileSystem.readAsStringAsync(`file://${imagePath}`, {
            encoding: 'base64',
        })
            .then((base64: string) => {
                const base64Img = `data:image/jpg;base64,${base64}`;
                const data = {
                    file: base64Img,
                    upload_preset: Config.CLOUDINARY_CLOUD_UPLOAD_PRESET,
                };

                return fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return json.secure_url as string;
            });
    };
}
