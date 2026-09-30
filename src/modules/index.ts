import { Router, type Router as ExpressRouter } from 'express';

import { adminRouter } from './admin/admin.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { cartRouter } from './cart/cart.routes.js';
import { categoryRouter } from './category/category.routes.js';
import { orderRouter } from './order/order.routes.js';
import { paymentRouter } from './payment/payment.routes.js';
import { productRouter } from './product/product.routes.js';
import { userRouter } from './user/user.routes.js';

export const modulesRouter: ExpressRouter = Router();

modulesRouter.use('/auth', authRouter);
modulesRouter.use('/users', userRouter);
modulesRouter.use('/products', productRouter);
modulesRouter.use('/categories', categoryRouter);
modulesRouter.use('/cart', cartRouter);
modulesRouter.use('/orders', orderRouter);
modulesRouter.use('/payments', paymentRouter);
modulesRouter.use('/admin', adminRouter);
