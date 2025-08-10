import { required } from 'joi';
import mongoose, { Schema } from 'mongoose';

const tokenSchema = new mongoose({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: Date.now + 3600000 },
  },
});

const Token = mongoose.model('Token', tokenSchema);

export { Token };
