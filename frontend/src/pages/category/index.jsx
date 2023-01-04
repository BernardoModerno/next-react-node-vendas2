import React, { useEffect } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { useState } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link'
import Head from "next/head"
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Wrapper } from '../../components/wrapper';
import { setupAPIClient } from '../../services/api'

export default  function Category() {

  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function loadCategories() {
        const apiClient = setupAPIClient();
  
        const response = await apiClient.get('/category');

        /* console.log(data) */
        setCategoryList(response.data)
    }
      
    loadCategories()
}, [])


  async function del (id) {
    if (window.confirm('Você realmente deseja excluir essa categoria?')) {
        const apiClient = setupAPIClient();
        await apiClient.delete(`category/${id}`);

        setCategoryList(categoryList.filter(categoria => categoria.id !== id));
    }
  }


  return (
    <>
        <Head>
             <title>Categoria</title>
        </Head>
          <Wrapper>
              <Link href='/createCategory'>
                <Button variant='outline-success mt-4' >
                    Nova Categoria
                </Button>
              </Link>
            <InputGroup className='mt-3 mb-3'>
                <InputGroup.Text>Buscar:</InputGroup.Text>
                <FormControl
                    onChange={(e) => {setTermoBusca(e.target.value)}}
                    placeholder='Buscar por nome da categoria'
                />
            </InputGroup>
            <table className='table table-striped table-hover'>
                <thead className='table-dark mt-3'>
                    <tr>
                        <th scope='col'>NU</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Criação</th>
                        <th scope='col'>Opções</th>
                    </tr>
                </thead>
                <tbody>
                   {categoryList.filter((categoria) => {
                    if (termoBusca == '') {
                        return categoria
                    } else if (categoria.name.toLowerCase().includes(termoBusca.toLowerCase())) {
                        return categoria
                    }
                   })
                   .map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.numerounico}</td>
                            <td>{categoria.name}</td>
                            <td>{categoria.created_at}</td>
                            <td>
                                <div>
                                       <Button
                                           variant='btn btn-sm btn-outline-primary me-2'
                                           onClick={() => router.push("category/editCategory/" + categoria.id)}
                                       >
                                           Editar
                                       </Button>
                                       <Button 
                                           variant='btn btn-sm btn-outline-danger me-2'
                                           onClick={() => del(categoria.id)}>
                                           Excluir
                                       </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </Wrapper>
        </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
  
    const response = await apiClient.get('/category');
    console.log(response.data);
  
  
    return {
      props: {
        categorys: response.data
      }
    }
  })

