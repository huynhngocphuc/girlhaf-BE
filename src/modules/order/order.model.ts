import { model, Schema, type InferSchemaType } from 'mongoose';

const customerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { _id: false },
);

const shippingAddressSchema = new Schema(
  {
    receiverName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    district: { type: String, trim: true },
    detail: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderCouponSchema = new Schema(
  {
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true },
    code: { type: String, required: true, trim: true },
    type: { type: String, enum: ['percent', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    released: { type: Boolean, default: false },
  },
  { _id: false },
);

const statusHistorySchema = new Schema(
  {
    status: { type: String, enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'], required: true },
    at: { type: Date, required: true, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    note: { type: String, trim: true },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    customer: { type: customerSchema, required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    items: { type: [orderItemSchema], required: true, validate: [(items: unknown[]) => items.length > 0, 'Order must contain items'] },
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    coupon: { type: orderCouponSchema, default: null },
    stockRestored: { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ['cod', 'vnpay', 'momo'], required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'failed', 'refunded'], default: 'unpaid', required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'], default: 'pending', required: true },
    statusHistory: { type: [statusHistorySchema], default: [] },
    trackingCode: { type: String, trim: true },
    note: { type: String, trim: true },
    expiresAt: { type: Date },
  },
  { timestamps: true, collection: 'orders' },
);

orderSchema.index({ 'customer.phone': 1, createdAt: 1 });
orderSchema.index({ userId: 1, createdAt: 1 });
orderSchema.index({ status: 1, createdAt: 1 });
orderSchema.index({ status: 1, expiresAt: 1 });

export type Order = InferSchemaType<typeof orderSchema>;
export const OrderModel = model('Order', orderSchema);