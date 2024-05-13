import dotenv from 'dotenv';
import connectDB from './helpers/db.helper';
import app from './server';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});