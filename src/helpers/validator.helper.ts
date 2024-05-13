import crypto from 'crypto';

export function generateShortenedUrl(originalUrl: string) : string {
    if (!isValidUrl(originalUrl)) {
        return '';
    }

    const hash: crypto.Hash = crypto.createHash('sha256');
    hash.update(originalUrl);
    return hash.digest('hex').slice(0, 8) ;
}

function isValidUrl(originalUrl: string) {
    const regex: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
    return (regex.test(originalUrl.toString().toLowerCase()));
}