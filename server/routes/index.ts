import * as express from 'express';
const router = express.Router()

import { router as categoriesRouter } from './categories.route'
import { router as productRouter } from './product.route'
import { router as purchasesRouter } from './purchases.route'

router.use('/categories', categoriesRouter)
router.use('/products', productRouter)
router.use('/purchases', purchasesRouter)


export default router