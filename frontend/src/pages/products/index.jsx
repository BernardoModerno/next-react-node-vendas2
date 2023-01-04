import { Wrapper } from '../../components/wrapper'
import React, { useEffect, useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { useRouter } from "next/router";
import Link from 'next/link'
import Head from "next/head"
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { setupAPIClient } from '../../services/api'

export default function Products({products}){

  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState('');
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function loadProducts() {
        const apiClient = setupAPIClient();
  
        const response = await apiClient.get('/product');

        /* console.log(data) */
        setProductList(response.data)
    }
      
    loadProducts()
}, [])
  
async function del (id) {
    if (window.confirm('Você realmente deseja excluir esse produto?')) {
        const apiClient = setupAPIClient();
        await apiClient.delete(`product/${id}`);

        setProductList(productList.filter(produto => produto.id !== id));
    }
  }

   return (
    <>
    <Head>
         <title>Produtos</title>
    </Head>
      <Wrapper>
          <Link href='/products/createProduct'>
            <Button variant='outline-success mt-4' >
                Novo Produto
            </Button>
          </Link>
        <InputGroup className='mt-3 mb-3'>
            <InputGroup.Text>Buscar:</InputGroup.Text>
            <FormControl
                onChange={(e) => {setTermoBusca(e.target.value)}}
                placeholder='Buscar por nome do produto'
            />
        </InputGroup>
        <table className='table table-striped table-hover'>
            <thead className='table-dark mt-3'>
                <tr>
                    <th scope='col'>NU</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Descrição</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Imagem</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'>Opções</th>
                </tr>
            </thead>
            <tbody>
               {productList.filter((produto) => {
                if (termoBusca == '') {
                    return produto
                } else if (produto.name.toLowerCase().includes(termoBusca.toLowerCase())) {
                    return produto
                } 
               })
               .map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.numerounico}</td>
                        <td>{produto.name}</td>
                        <td>{produto.description}</td>
                        <td>{produto.price}</td>
                        <td><img src={`http://localhost:3333/files/${produto.banner}`} width="50" height="50" /></td>
                        <td>{produto.category.name}</td>
                        <td>
                            <div>
                                   <Button
                                       variant='btn btn-sm btn-outline-primary me-2'
                                       onClick={() => router.push("/products/editProduct/" + produto.id)}
                                   >
                                       Editar
                                   </Button>
                                   <Button 
                                       variant='btn btn-sm btn-outline-danger me-2'
                                       onClick={() => del(produto.id)}>
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

  const response = await apiClient.get('/product');
  console.log(response.data);


  return {
    props: {
      products: response.data
    }
  }
})
