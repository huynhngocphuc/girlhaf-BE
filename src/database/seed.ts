import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { CartModel } from '../modules/cart/cart.model.js';
import { CategoryModel } from '../modules/category/category.model.js';
import { CouponModel } from '../modules/admin/coupon.model.js';
import { OrderModel } from '../modules/order/order.model.js';
import { PaymentModel } from '../modules/payment/payment.model.js';
import { ProductModel, ProductVariantModel } from '../modules/product/product.model.js';
import { UserModel } from '../modules/user/user.model.js';

const seedCredentials = {
  password: 'password',
  passwordHash: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
};

async function seed(): Promise<void> {
  await connectDatabase();

  const category = await CategoryModel.findOneAndUpdate(
    { slug: 'ao-thun' },
    { $set: { name: 'Áo thun', status: 'active' } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const product = await ProductModel.findOneAndUpdate(
    { slug: 'ao-thun-basic-den' },
    {
      $set: {
        categoryId: category._id,
        gender: 'unisex',
        tags: ['basic', 'cotton'],
        name: 'Áo thun basic đen',
        description: 'Áo thun cotton cơ bản cho bộ sưu tập MVP.',
        status: 'active',
        basePrice: 199000,
        compareAtPrice: 249000,
        colors: [{ code: 'black', name: 'Đen', hex: '#111111' }],
        thumbnail: 'https://cdn.example.com/girlhaf/ao-thun-basic-den-thumb-v1.jpg',
        images: [
          {
            color: 'black',
            url: 'https://cdn.example.com/girlhaf/ao-thun-basic-den-v1.jpg',
            publicId: 'girlhaf/ao-thun-basic-den-v1',
            alt: 'Áo thun basic đen',
            width: 1200,
            height: 1200,
            sortOrder: 0,
            isPrimary: true,
          },
        ],
        deletedAt: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const smallVariant = await ProductVariantModel.findOneAndUpdate(
    { sku: 'TS-BLK-S' },
    { $set: { productId: product._id, size: 'S', color: 'black', priceOverride: null, stock: 20, status: 'active' } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  const mediumVariant = await ProductVariantModel.findOneAndUpdate(
    { sku: 'TS-BLK-M' },
    { $set: { productId: product._id, size: 'M', color: 'black', priceOverride: null, stock: 35, status: 'active' } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const customer = await UserModel.findOneAndUpdate(
    { email: 'customer.seed@girlhaf.local' },
    {
      $set: {
        phone: '0900000001',
        passwordHash: seedCredentials.passwordHash,
        name: 'Seed Customer',
        role: 'customer',
        status: 'active',
        addresses: [
          {
            receiverName: 'Seed Customer',
            phone: '0900000001',
            province: 'Ho Chi Minh City',
            ward: 'Ben Nghe',
            district: 'District 1',
            detail: '1 Nguyen Hue',
            isDefault: true,
          },
        ],
        deletedAt: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await UserModel.findOneAndUpdate(
    { email: 'admin.seed@girlhaf.local' },
    {
      $set: {
        passwordHash: seedCredentials.passwordHash,
        name: 'Seed Admin',
        role: 'admin',
        status: 'active',
        addresses: [],
        deletedAt: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const coupon = await CouponModel.findOneAndUpdate(
    { code: 'WELCOME10' },
    {
      $set: {
        type: 'percent',
        value: 10,
        minOrder: 100000,
        maxDiscount: 50000,
        startAt: new Date('2026-01-01T00:00:00.000Z'),
        endAt: new Date('2027-01-01T00:00:00.000Z'),
        usageLimit: 100,
        usedCount: 1,
        status: 'active',
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await CartModel.findOneAndUpdate(
    { userId: customer._id },
    { $set: { items: [{ variantId: mediumVariant._id, quantity: 1 }] } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const orderNumber = 'GH-SEED-0001';
  const order = await OrderModel.findOneAndUpdate(
    { orderNumber },
    {
      $set: {
        userId: customer._id,
        customer: { name: 'Seed Customer', phone: '0900000001', email: 'customer.seed@girlhaf.local' },
        shippingAddress: {
          receiverName: 'Seed Customer',
          phone: '0900000001',
          province: 'Ho Chi Minh City',
          ward: 'Ben Nghe',
          district: 'District 1',
          detail: '1 Nguyen Hue',
        },
        items: [
          {
            productId: product._id,
            variantId: mediumVariant._id,
            name: 'Áo thun basic đen',
            sku: 'TS-BLK-M',
            size: 'M',
            color: 'black',
            image: 'https://cdn.example.com/girlhaf/ao-thun-basic-den-v1.jpg',
            unitPrice: 199000,
            quantity: 1,
            lineTotal: 199000,
          },
        ],
        subtotal: 199000,
        shippingFee: 0,
        discount: 19900,
        total: 179100,
        coupon: {
          couponId: coupon._id,
          code: 'WELCOME10',
          type: 'percent',
          value: 10,
          released: false,
        },
        stockRestored: false,
        paymentMethod: 'cod',
        paymentStatus: 'unpaid',
        status: 'confirmed',
        statusHistory: [{ status: 'pending', at: new Date('2026-09-01T09:00:00.000Z') }, { status: 'confirmed', at: new Date('2026-09-01T09:01:00.000Z') }],
        note: 'Seed order for local development',
        expiresAt: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await PaymentModel.findOneAndUpdate(
    { orderId: order._id, provider: 'cod' },
    { $set: { transactionId: null, amount: 179100, status: 'pending', rawResponse: { seeded: true } } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log('Seed completed', {
    testCredentials: {
      customer: 'customer.seed@girlhaf.local',
      admin: 'admin.seed@girlhaf.local',
      password: seedCredentials.password,
    },
    categoryId: category._id.toString(),
    productId: product._id.toString(),
    variantIds: [smallVariant._id.toString(), mediumVariant._id.toString()],
    customerId: customer._id.toString(),
    couponId: coupon._id.toString(),
    orderId: order._id.toString(),
  });
}

seed()
  .catch((error: unknown) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });