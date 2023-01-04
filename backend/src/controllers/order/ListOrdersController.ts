import {Request, Response} from 'express'
import prismaClient from '../../prisma';
import { ListOrdersService } from '../../services/order/ListOrdersService'

class ListOrdersController{
  async handle(req: Request, res: Response){
    const take = 15 as number;
    const page = parseInt(req.query.page as string || '1');
    const total= await prismaClient.order.count(
      {
        where:{
          draft: true,
          status: false,
        },
      }
    );

    const orders = await prismaClient.order.findMany({
      where:{
        draft: true,
        status: false,
      },
      orderBy:{
        created_at: 'desc'
      },
      include:{
        items : true
      },
      take: take,
      skip: (page - 1) * take,
    })

    //const orders = await listOrdersService.execute();

    return res.json({
      data: orders,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take)}
    });

  }
}

export { ListOrdersController }