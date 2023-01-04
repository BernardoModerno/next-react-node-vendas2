import prismaClient from "../../prisma";


class DetailItemSerivce{
  async execute(){
    
    const items = await prismaClient.item.findMany({
      
      include: {
        // Include posts
        product: {
          include: {
            category: true,
          },
        },
      },
    })
    
    return items;
    
  }
}

export { DetailItemSerivce }