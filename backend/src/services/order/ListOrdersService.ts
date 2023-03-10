import prismaClient from "../../prisma";

class ListOrdersService{
  async execute(){
    
    const orders = await prismaClient.order.findMany({
      where:{
        draft: true,
        status: false,
      },
      orderBy:{
        created_at: 'desc'
      },
      include: {
        // Include 
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

export { ListOrdersService }