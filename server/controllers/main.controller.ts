import { readFileSync, writeFileSync } from 'fs'
import { Request, Response } from 'express';
import path from 'path'

type Product = {
    id: string,
    name: string,
    category: string,
    price: string | number,
    img: string,
    info: string
}
interface Data {
    categories: [],
    products: Product[],
    purchases: string[]
}

class MainController {

    config = path.join(__dirname, '../../data.json');

    getData = () => {
        const json1 = readFileSync(this.config, 'utf-8')
        const data: Data = JSON.parse(json1)
        return data
    }

    writeData = (data: Data) => {
        const json = JSON.stringify(data)
        writeFileSync(this.config, json)
    }

}

export default MainController