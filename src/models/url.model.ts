import mongoose, { Schema} from 'mongoose';

export interface IUrl {
    originalUrl: string;
    shortenedUrl: string;
}

export const UrlSchema: Schema = new Schema({
    originalUrl: { type: String, required: true },
    shortenedUrl: { type: String, required: true, unique: true }
});

export default mongoose.model<IUrl>('Url', UrlSchema);