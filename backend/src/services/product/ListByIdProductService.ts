import prismaClient from "../../prisma";

interface ProductRequest{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
    category_id: string;
  }

class ListByIdProductService{
    async execute({ id, name, description, price, banner, category_id }: ProductRequest) {

    const product = await prismaClient.product.findUnique({
        where:{
            id: id
          },
          select:{
            id: true,
            name: true,
            description: true,
            price: true,
            banner: true,
            category: true,
          }
    })

    return product;

  }
}

export { ListByIdProductService }