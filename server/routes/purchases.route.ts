import * as express from 'express';
import purchasesController from '../controllers/purchases.controller'

const router = express.Router()

router.get('/', purchasesController.getPurchases)
router.post('/', purchasesController.addPurchases)

export { router }