import prismaClient from "../../prisma";

class ListProductService{
  async execute(){

    const product = await prismaClient.product.findMany({
          include:{
            category:true,
          }
        })

    return product;

  }
}

export { ListProductService }