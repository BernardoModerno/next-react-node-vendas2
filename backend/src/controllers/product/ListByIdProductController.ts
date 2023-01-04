import {Request, Response } from 'express'
import { ListByIdProductService } from '../../services/product/ListByIdProductService'

class ListByIdProductController{
  async handle(req: Request, res: Response){
    const { id } = req.params;
    const { name, description, price, banner, category_id } = req.body;

    const listByIdProductService = new ListByIdProductService();

    const product = await listByIdProductService.execute({
      id,
      name,
      description,
      price,
      banner,
      category_id,
    })

    return res.json(product);

  }
}

export { ListByIdProductController }