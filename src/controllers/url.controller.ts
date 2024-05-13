import { Request, Response } from "express";
import urlModel, { IUrl } from '../models/url.model';
import { generateShortenedUrl } from '../helpers/validator.helper';

export async function shortenUrl(req: Request, res : Response) {
    const originalUrl: string = req.body.url;
    if (!originalUrl || generateShortenedUrl(originalUrl) === ''){
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const existingUrl: IUrl | null = await urlModel.findOne({ originalUrl });;
        if (existingUrl) {
            return res.json({ shortenedUrl: `http://localhost:${process.env.PORT || 3000}/${existingUrl.shortenedUrl}`
            });
        }

        const shortenedUrl: string = generateShortenedUrl(originalUrl);
        // console.log('shortenedurl:', shortenedUrl)
        await urlModel.create({ originalUrl, shortenedUrl });
        const fullShortenedUrl = `http://localhost:${process.env.PORT || 3000}/${shortenedUrl}`;
        // console.log('fullShortenedUrl:', fullShortenedUrl)
        res.json({ shortenedUrl: fullShortenedUrl });

    } catch (err) {
        console.error('Error shortening URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function redirectToOriginalUrl(req: Request, res : Response) {
    const shortenedUrl: string = req.params.shortenedUrl;

    try {
        const url: IUrl | null = await urlModel.findOne({ shortenedUrl });
        
        //  console.log('shortenedUrl: ' ,shortenedUrl)
        //  console.log('url: ' ,url)
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'Shortened URL not found' });
        }
    } catch (err) {
        console.error('Error redirecting:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}