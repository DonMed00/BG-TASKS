import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  contentType: { type: String, required: true },
  extension: { type: String, required: true },
  processedTimestamp: { type: Date, default: Date.now },
  sourceIp: { type: String, required: true },
  filePath: { type: String, required: true }
});

export interface FileDocument extends Document {
  name: string;
  size: number;
  contentType: string;
  extension: string;
  processedTimestamp: Date;
  sourceIp: string;
  filePath: string;
}