import prismaClient from "../../prisma";

interface CategoryRequest{
    id: string;
    name: string
  }

class ListByIdCategoryService{
    async execute({ id, name }: CategoryRequest) {

    const category = await prismaClient.category.findUnique({
        where:{
            id: id
          },
          select:{
            id: true,
            name: true,
          }
    })

    return category;

  }
}

export { ListByIdCategoryService }