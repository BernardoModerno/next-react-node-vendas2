import prismaClient from "../../prisma";

interface CategoryRequest{
  id: string;
  name: string
}

class EditCategoryService{
  async execute({ id, name }: CategoryRequest){

    const category = await prismaClient.category.update({
      where:{
        id: id
      },
      data:{
        name: name,
      }
    })

    return category;

  }
}

export { EditCategoryService }