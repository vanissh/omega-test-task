import * as express from 'express';
import categoriesController from '../controllers/categories.controller'

const router = express.Router()

router.get('/', categoriesController.getCategories)

export { router }