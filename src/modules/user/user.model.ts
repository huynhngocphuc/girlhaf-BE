import { model, Schema, type InferSchemaType } from 'mongoose';

const addressSchema = new Schema(
  {
    receiverName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    district: { type: String, trim: true },
    detail: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer', required: true },
    status: { type: String, enum: ['active', 'blocked'], default: 'active', required: true },
    addresses: { type: [addressSchema], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'users' },
);

export type User = InferSchemaType<typeof userSchema>;
export type Address = User['addresses'][number];
export const UserModel = model('User', userSchema);