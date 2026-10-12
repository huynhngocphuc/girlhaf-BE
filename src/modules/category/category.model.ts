import { model, Schema, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
  },
  { timestamps: true, collection: 'categories' },
);

export type Category = InferSchemaType<typeof categorySchema>;
export const CategoryModel = model('Category', categorySchema);