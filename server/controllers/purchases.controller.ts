import { Request, Response } from 'express';
import MainController from '../controllers/main.controller'

class PurchasesController extends MainController {

    constructor() {
        super()
    }

    getPurchases = (req: Request, res: Response) => {
        const data = this.getData()
        res.json(data.purchases)
    }

    addPurchases = (req: Request, res: Response) => {
        const data = this.getData()
        const id: string = req.body

        data.purchases.push(id)

        this.writeData(data)
        res.json(data.purchases)
    }
}

export default new PurchasesController()