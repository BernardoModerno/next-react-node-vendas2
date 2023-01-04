import prismaClient from "../../prisma";

interface ProductRequest{
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class EditProductService{
  async execute({ id, name, price, description, category_id, banner }: ProductRequest){

    const product = await prismaClient.product.update({
      where:{
        id: id
      },
      data:{
        name: name,
        price: price,
        description: description,
        category_id: category_id,
        banner: banner
      }
    })

    return product;

  }
}

export { EditProductService }