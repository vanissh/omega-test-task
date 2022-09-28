import { Request, Response } from 'express';
import MainController from '../controllers/main.controller'

class CategoriesController extends MainController {

    constructor() {
        super()
    }

    getCategories = (req: Request, res: Response) => {
        const data = this.getData()
        res.json(data.categories)
    }
}

export default new CategoriesController()