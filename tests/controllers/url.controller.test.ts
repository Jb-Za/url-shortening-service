import { shortenUrl, redirectToOriginalUrl } from '../../src/controllers/url.controller'; // Replace 'your-file-name' with the actual filename
import urlModel from '../../src/models/url.model';
import { generateShortenedUrl } from '../../src/helpers/validator.helper';
import { Request, Response } from 'express';
import Sinon from 'sinon';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
describe('shortenUrl', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri).catch(err => console.error('MongoDB connection error:', err));
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
    
    beforeEach(async () => {
        jest.clearAllMocks();
        // Before each test, clear the database
        for (var i in mongoose.connection.collections) {
            await mongoose.connection.collections[i].deleteMany({});
        }
    });

    it('should return an error for an invalid URL', async () => {
        const req: Request = { body: { url: 'invalid/url' } } as Request;
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await shortenUrl(req, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid URL' });
    });

    it('should return an existing shortened URL if already exists', async () => {
        const shortenedUrl = 'd9331ac1';
        const originalUrl = 'https://www.youtube.com';
        const url = new urlModel({ originalUrl, shortenedUrl });
        await url.save();

        const existingUrl = { originalUrl: 'https://www.youtube.com', shortenedUrl: 'd9331ac1' };
        const req = { body: { url: existingUrl.originalUrl } } as Request;
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        //decided to not use mocks once i figured out how to use mongo memory server
        //mock the db call and expect the function to still return the expected response
        //urlModel.findOne = jest.fn().mockResolvedValue(existingUrl);

        await shortenUrl(req, res as Response);

        expect(res.json).toHaveBeenCalledWith({ shortenedUrl: existingUrl.shortenedUrl});
    });

    it('should create and return a shortened URL if it does not exist', async () => {
        const req = { body: { url: 'https://www.youtube.com' } } as Request;
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const shortenedUrl = 'd9331ac1';
        const fullShortenedUrl = `http://localhost:${process.env.PORT || 3000}/${shortenedUrl}`;

        //decided to not use mocks once i figured out how to use mongo memory server
        //urlModel.findOne = jest.fn().mockResolvedValue(null);
        //urlModel.create = jest.fn().mockResolvedValue({ originalUrl: 'https://www.youtube.com', shortenedUrl});

        await shortenUrl(req, res as Response);

        expect(res.json).toHaveBeenCalledWith({ shortenedUrl: fullShortenedUrl });
    });
});

describe('redirectToOriginalUrl', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri).catch(err => console.error('MongoDB connection error:', err));
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
    
    beforeEach(async () => {
        jest.clearAllMocks();
        // Before each test, clear the database
        for (var i in mongoose.connection.collections) {
            await mongoose.connection.collections[i].deleteMany({});
        }
    });

    it('should redirect to the original URL if shortened URL exists', async () => {
        const shortenedUrl = 'd9331ac1';
        const originalUrl = 'https://www.youtube.com';
        const url = new urlModel({ originalUrl, shortenedUrl });
        await url.save();

        // Now the document should be in the database
        //const foundUrl = await urlModel.findOne({ shortenedUrl });
        //console.log('foundUrl: ', foundUrl);

        const req = { params: { shortenedUrl } } as unknown as Request;
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            redirect: jest.fn(),
        };
        
        await redirectToOriginalUrl(req, res as Response);
        
        expect(res.redirect).toHaveBeenCalledWith(originalUrl);
    });

    it('should return not found error if the shortened URL does not exist', async () => {
        const req = { params: { shortenedUrl: 'nonexistent' } } as unknown as Request;
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        await redirectToOriginalUrl(req, res as Response);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Shortened URL not found' });
    });
    
});





