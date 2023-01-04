import prismaClient from "../../prisma";

interface DetailRequest{
  id: string;
}

class DetailOrderSerivce{
  async execute({ id }: DetailRequest){
    
    const orders = await prismaClient.order.findMany({
      where:{
        id: id
      },
      include: {
        // Include posts
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })
    
    return orders;
    
  }
}

export { DetailOrderSerivce }