import 'react-native-url-polyfill/auto';

/**
 * Add / to the end of any URL if not present
 */
function addTrailingForwardSlash(url: string): string {
    if (!url.endsWith('/')) {
        return `${url}/`;
    }
    return url;
}

/**
 * Get path from URL string
 */
function getPathFromURL(url: string): string {
    try {
        const parsedUrl = new URL(url);
        const path = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
        return path.substring(1); // Remove the leading '/'
    } catch (error) {
        console.error('Error parsing URL:', error);
        return ''; // Return empty string for invalid URLs
    }
}

/**
 * Determine if two urls have the same origin
 */
function hasSameIeattaOrigin(url1: string, url2: string): boolean {
    const removeW3 = (host: string) => host.replace(/^www\./i, '');
    try {
        const parsedUrl1 = new URL(url1);
        const parsedUrl2 = new URL(url2);

        return removeW3(parsedUrl1.host) === removeW3(parsedUrl2.host);
    } catch (error) {
        // Handle invalid URLs or other parsing errors
        console.error('Error parsing URLs:', error);
        return false;
    }
}

/**
 * Appends or updates a query parameter in a given URL.
 */
function appendParam(url: string, paramName: string, paramValue: string) {
    // If parameter exists, replace it
    if (url.includes(`${paramName}=`)) {
        const regex = new RegExp(`${paramName}=([^&]*)`);
        return url.replace(regex, `${paramName}=${paramValue}`);
    }

    // If parameter doesn't exist, append it
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${paramName}=${paramValue}`;
}

function hasURL(text: string) {
    const urlPattern = /((https|http)?:\/\/[^\s]+)/g;

    return urlPattern.test(text);
}

export {addTrailingForwardSlash, hasSameIeattaOrigin, getPathFromURL, appendParam, hasURL};
