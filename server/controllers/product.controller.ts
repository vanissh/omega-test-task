import { Request, Response } from 'express';
import MainController from '../controllers/main.controller'

type Product = {
    id: string,
    name: string,
    category: string,
    price: string | number,
    img: string,
    info: string
}

class ProductController extends MainController {

    constructor() {
        super()
    }

    createProduct = (req: Request, res: Response) => {
        let product: Product = req.body

        const data = this.getData()
        data.products.push(product)

        this.writeData(data)
        res.json(data.products)
    }

    getProducts = (req: Request, res: Response) => {
        const data = this.getData()
        res.json(data.products)
    }

    getCategories = (req: Request, res: Response) => {
        const data = this.getData()
        res.json(data.categories)
    }

    deleteProduct = (req: Request, res: Response) => {
        const data = this.getData()

        const { id } = req.params
        data.products = data.products.filter(item => item.id !== id)

        this.writeData(data)
        res.json(data.products)
    }
}

export default new ProductController()