import {Request, Response} from 'express'
import { DetailItemSerivce } from '../../services/order/DetailItemSerivce'



class DetailItemController{
  async handle(req: Request, res: Response){

    const detailItemSerivce = new DetailItemSerivce();

    const items = await detailItemSerivce.execute()

    return res.json(items);

  }
}

export { DetailItemController }