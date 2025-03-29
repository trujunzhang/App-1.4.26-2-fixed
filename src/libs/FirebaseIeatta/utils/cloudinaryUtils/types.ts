type ICloudinaryUtils = {
    // blob:https://dev.new.ieatta.com:8082/3e5874db-27ac-4679-9285-c6936440dcbe
    readAsBase64FromBlob(blobHttps: string): Promise<string | undefined>;
    readAsBase64FromExpoFileSystem(fileUri: string): Promise<string>;
    readAsBase64(fileUriOrBlobHttps: string): Promise<string | undefined>;
    uploadToCloudinary(base64: string): Promise<string | undefined>;
};

export default ICloudinaryUtils;
