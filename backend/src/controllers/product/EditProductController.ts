import {Request, Response } from 'express'
import { EditProductService } from '../../services/product/EditProductService'

class EditProductController{
  async handle(req: Request, res: Response){
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;
    const banner  = req.file.filename;

    const editProductService = new EditProductService();
    
    const product = await editProductService.execute({
      id,
      name,
      price,
      description,
      banner,
      category_id
    })

    return res.json(product);

  }
}

export { EditProductController }