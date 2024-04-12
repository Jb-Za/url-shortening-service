import { generateShortenedUrl } from '../../src/helpers/validator.helper'; // replace 'yourModule' with the actual module where these functions are defined

describe('generateShortenedUrl', () => {
    it('should return a shortened URL for a valid URL', () => {
        const originalUrl = 'https://www.microsoft.com';
        const shortenedUrl = generateShortenedUrl(originalUrl);
        expect(shortenedUrl).toHaveLength(8);
    });

    it('should return an empty string for an invalid URL', () => {
        const originalUrl = 'invalid/url';
        const shortenedUrl = generateShortenedUrl(originalUrl);
        expect(shortenedUrl).toBe('');
    });
});
