import prismaClient from "../../prisma";

interface CategoryRequest{
  id: string;
}

class DeleteCategoryService{
  async execute({ id }: CategoryRequest){

    const categoryId = await prismaClient.category.delete({
      where:{
        id
      }
    })

    return categoryId;
    
  }
}

export { DeleteCategoryService }