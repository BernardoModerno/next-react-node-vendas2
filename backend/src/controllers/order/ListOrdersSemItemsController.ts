import {Request, Response} from 'express'
import { ListOrdersServiceSemItems } from '../../services/order/ListOrdersServiceSemItems'

class ListOrdersSemItemsController{
  async handle(req: Request, res: Response){
    const listOrdersServiceSemItems = new ListOrdersServiceSemItems()

    const orders = await listOrdersServiceSemItems.execute();

    return res.json(orders);

  }
}

export { ListOrdersSemItemsController }