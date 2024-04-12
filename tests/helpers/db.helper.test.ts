import mongoose from 'mongoose';
import connectDB from '../../src/helpers/db.helper';


describe('connectDB', () => {
    let connection: mongoose.Connection;

    beforeAll(async () => {
        connection = await connectDB();
        await new Promise<void>((resolve) => {
            connection.on('open', () => {
                resolve();
            });
        });
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should connect to the MongoDB database', async () => {
        const readyState: mongoose.ConnectionStates = connection.readyState;
        expect(readyState).toBe(1);
    });
});


// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting