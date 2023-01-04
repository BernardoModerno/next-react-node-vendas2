import {Request, Response } from 'express'
import { EditCategoryService } from '../../services/category/EditCategoryService'

class EditCategoryController{
  async handle(req: Request, res: Response){
    const { id } = req.params;
    const { name } = req.body;

    const editCategoryService = new EditCategoryService();

    const category = await editCategoryService.execute({
      id,
      name
    })

    return res.json(category);

  }
}

export { EditCategoryController }