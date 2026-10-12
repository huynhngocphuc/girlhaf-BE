import { model, Schema, type InferSchemaType } from 'mongoose';

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['percent', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrder: { type: Number, required: true, min: 0, default: 0 },
    maxDiscount: { type: Number, min: 0 },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    usageLimit: { type: Number, min: 1, default: null },
    usedCount: { type: Number, min: 0, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
  },
  { timestamps: true, collection: 'coupons' },
);

export type Coupon = InferSchemaType<typeof couponSchema>;
export const CouponModel = model('Coupon', couponSchema);