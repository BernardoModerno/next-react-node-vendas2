import {Request, Response} from 'express'
import { DetailOrderSerivce } from '../../services/order/DetailOrderSerivce'



class DetailOrderController{
  async handle(req: Request, res: Response){
    const { id } = req.params;

    const detailOrderService = new DetailOrderSerivce();

    const orders = await detailOrderService.execute({
      id
    })

    return res.json(orders);

  }
}

export { DetailOrderController }