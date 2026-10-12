import { model, Schema, type InferSchemaType } from 'mongoose';

const cartItemSchema = new Schema(
  {
    variantId: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: { createdAt: false, updatedAt: true }, collection: 'carts' },
);

export type Cart = InferSchemaType<typeof cartSchema>;
export const CartModel = model('Cart', cartSchema);