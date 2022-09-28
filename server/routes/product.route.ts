import * as express from 'express';
import productController from '../controllers/product.controller'

const router = express.Router()

router.get('/', productController.getProducts)
router.post('/', productController.createProduct)
router.post('/:id', productController.deleteProduct)

export { router }