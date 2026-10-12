import { model, Schema, Types, type InferSchemaType } from 'mongoose';

const productColorSchema = new Schema(
  {
    code: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    hex: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const productImageSchema = new Schema(
  {
    color: { type: String, default: null, trim: true },
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
    alt: { type: String, trim: true },
    width: { type: Number, min: 1 },
    height: { type: Number, min: 1 },
    sortOrder: { type: Number, min: 0, default: 0 },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: true },
);

const productSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
    tags: { type: [String], default: [] },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'active', 'hidden'], default: 'draft', required: true },
    basePrice: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    colors: { type: [productColorSchema], default: [] },
    thumbnail: { type: String, trim: true },
    images: { type: [productImageSchema], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'products' },
);

productSchema.index({ gender: 1, categoryId: 1, status: 1 });
productSchema.index({ name: 'text' });

const productVariantSchema = new Schema(
  {
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    priceOverride: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
  },
  { timestamps: true, collection: 'product_variants' },
);

productVariantSchema.index({ productId: 1, size: 1, color: 1 }, { unique: true });
productVariantSchema.index({ productId: 1, status: 1 });
productVariantSchema.index({ productId: 1, stock: 1 });

export type Product = InferSchemaType<typeof productSchema>;
export type ProductVariant = InferSchemaType<typeof productVariantSchema>;
export const ProductModel = model('Product', productSchema);
export const ProductVariantModel = model('ProductVariant', productVariantSchema);