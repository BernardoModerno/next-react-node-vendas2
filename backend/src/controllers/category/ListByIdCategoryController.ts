import {Request, Response } from 'express'
import { ListByIdCategoryService } from '../../services/category/ListByIdCategoryService'

class ListByIdCategoryController{
  async handle(req: Request, res: Response){
    const { id } = req.params;
    const { name } = req.body;

    const listByIdCategoryService = new ListByIdCategoryService();

    const category = await listByIdCategoryService.execute({
      id,
      name
    })

    return res.json(category);

  }
}

export { ListByIdCategoryController }