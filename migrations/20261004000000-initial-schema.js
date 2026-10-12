const collections = {
  users: [{ key: { email: 1 }, options: { unique: true, name: 'email_1' } }],
  categories: [{ key: { slug: 1 }, options: { unique: true, name: 'slug_1' } }],
  products: [
    { key: { slug: 1 }, options: { unique: true, name: 'slug_1' } },
    { key: { gender: 1, categoryId: 1, status: 1 }, options: { name: 'gender_1_categoryId_1_status_1' } },
    { key: { name: 'text' }, options: { name: 'name_text' } },
  ],
  product_variants: [
    { key: { sku: 1 }, options: { unique: true, name: 'sku_1' } },
    { key: { productId: 1, size: 1, color: 1 }, options: { unique: true, name: 'productId_1_size_1_color_1' } },
    { key: { productId: 1, status: 1 }, options: { name: 'productId_1_status_1' } },
    { key: { productId: 1, stock: 1 }, options: { name: 'productId_1_stock_1' } },
  ],
  carts: [{ key: { userId: 1 }, options: { unique: true, name: 'userId_1' } }],
  coupons: [{ key: { code: 1 }, options: { unique: true, name: 'code_1' } }],
  orders: [
    { key: { orderNumber: 1 }, options: { unique: true, name: 'orderNumber_1' } },
    { key: { 'customer.phone': 1, createdAt: 1 }, options: { name: 'customer.phone_1_createdAt_1' } },
    { key: { userId: 1, createdAt: 1 }, options: { name: 'userId_1_createdAt_1' } },
    { key: { status: 1, createdAt: 1 }, options: { name: 'status_1_createdAt_1' } },
    { key: { status: 1, expiresAt: 1 }, options: { name: 'status_1_expiresAt_1' } },
  ],
  payments: [
    {
      key: { provider: 1, transactionId: 1 },
      options: {
        unique: true,
        name: 'provider_1_transactionId_1',
        partialFilterExpression: { transactionId: { $exists: true } },
      },
    },
    { key: { orderId: 1 }, options: { name: 'orderId_1' } },
  ],
};

async function ensureCollection(db, name) {
  const existing = await db.listCollections({ name }).toArray();
  if (existing.length === 0) await db.createCollection(name);
}

async function ensureIndexes(db, name, indexes) {
  const existing = await db.collection(name).listIndexes().toArray();
  const existingNames = new Set(existing.map((index) => index.name));
  for (const index of indexes) {
    if (!existingNames.has(index.options.name)) {
      await db.collection(name).createIndex(index.key, index.options);
    }
  }
}

module.exports = {
  async up(db) {
    for (const [name, indexes] of Object.entries(collections)) {
      await ensureCollection(db, name);
      await ensureIndexes(db, name, indexes);
    }
  },
  async down(db) {
    for (const name of Object.keys(collections)) {
      const existing = await db.listCollections({ name }).toArray();
      if (existing.length > 0) await db.collection(name).drop();
    }
  },
};