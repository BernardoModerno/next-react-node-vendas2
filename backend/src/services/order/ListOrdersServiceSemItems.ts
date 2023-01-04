import prismaClient from "../../prisma";

class ListOrdersServiceSemItems{
  async execute(){
    
    const orders = await prismaClient.order.findMany({
      where:{
        draft: true,
        status: false,
        items: {
          none: {
            id: undefined
          }
        }
      },
      orderBy:{
        created_at: 'desc'
      },
      include: {
        
             
                items: true,
              
            
      },
      
    })

    
    
    return orders;
    
  }
}

export { ListOrdersServiceSemItems }