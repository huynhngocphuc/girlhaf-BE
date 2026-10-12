import { model, Schema, type InferSchemaType } from 'mongoose';

const paymentSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    provider: { type: String, enum: ['cod', 'vnpay', 'momo'], required: true },
    transactionId: { type: String, trim: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'success', 'failed', 'refunded'], required: true },
    paidAt: { type: Date },
    rawResponse: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: 'payments' },
);

paymentSchema.index(
  { provider: 1, transactionId: 1 },
  { unique: true, partialFilterExpression: { transactionId: { $exists: true } } },
);
paymentSchema.index({ orderId: 1 });

export type Payment = InferSchemaType<typeof paymentSchema>;
export const PaymentModel = model('Payment', paymentSchema);