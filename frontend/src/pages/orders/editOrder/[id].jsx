import { Wrapper } from '../../../components/wrapper'
import React, { useEffect, useState } from 'react'
import { canSSRAuth } from '../../../utils/canSSRAuth'
import mascaraData from "../../../utils/data";
import { toast } from 'react-toastify'
import { useRouter } from "next/router";
import Link from 'next/link'
import Router from 'next/router';
import Head from "next/head"
import { Button, FormControl, InputGroup, Container, Form } from 'react-bootstrap';
import { setupAPIClient } from '../../../services/api'

export default function EditOrders({ orders }) {

  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState('');
  const [ordersList, setOrdersList] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState([])

  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState()
  const [amount, setAmount] = useState(1)
  const [items, setItems] = useState([]);
  const [order_id, setOrderId] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    async function loadOrders() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get(`order/detail/${router.query.id}`);
      
      setOrdersList(response.data[0].items)

      console.log(response.data[0]);
      

    }

    loadOrders()
  }, [handleAdd])

  useEffect(() => {
    async function loadInfo() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/category')

      setCategory(response.data);
      setCategorySelected(response.data[0])

      console.log("Categoria selecionada: " + category[categorySelected]?.id);

    }

    loadInfo();
  }, [])


  useEffect(() => {

    async function loadProducts() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get('/categories/products', {
        params: {
          category_id: category[categorySelected]?.id
        }
      })
      

      setProducts(response.data);
      setProductSelected(response.data[0])
      console.log("Testando " + router.query.id);
      console.log("Order Id: " + order_id)
      
      // console.log("Produto selecionado: " + productSelected.id);

    }

    loadProducts();

  }, [categorySelected])

  useEffect(() => {
    async function loadOrderId() {
      const apiClient = setupAPIClient();

      const response = await apiClient.get(`order/detail/${router.query.id}`);
      setOrderId(response.data[0].id)

    }
    loadOrderId()
  }, [])

  //Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event) {
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
    //console.log('Categoria selecionada ', categories[event.target.value])
    setCategorySelected(event.target.value)

  }

  function handleChangeProduct(event) {
    setProductSelected(event.target.value);
    
  }
  
  async function handleAdd(e) {
    e.preventDefault();

    const apiClient = setupAPIClient();
    await apiClient.post('/order/add', {
      order_id: order_id,
      product_id: productSelected?.id,
      amount: amount
    })


    toast.success('Item cadastrado com sucesso!')

  }

  async function delOrder(id) {
    if (window.confirm('Você realmente deseja excluir essa Ordem?')) {
      const apiClient = setupAPIClient();
      await apiClient.delete('/order', {
        params: {
          order_id: router.query.id
        }
      });

      Router.push(`/orders`)
    }
  }

  async function delItem(id) {
    if (window.confirm('Você realmente deseja excluir esse item?')) {
      const apiClient = setupAPIClient();
      await apiClient.delete(`order/remove`, {
        params: {
          item_id: id
        }
      });

      setOrdersList(ordersList.filter(ordem => ordem.id !== id));
    }
  }

  return (
    <>
      <Head>
        <title>Ordens</title>
      </Head>
      <Wrapper>
        <Container className='container text-center mt-1'>
          <Form onSubmit={handleAdd}>
           <div>
             <div className='form-signin w-50 m-auto'>
               <Form.Group className="mb-1 mt-1" controlId="nome">
                 <Form.Label>Ordem de Venda:</Form.Label>
                  <Form.Control type='text' disabled placeholder='Ordem de Venda:' value={order_id} onChange={(e) => setOrderId(e.target.value)} />
               </Form.Group>
             </div>
 
              <div className='form-signin w-50 m-auto mb-1'>
                <label className='form-label'>Categorias</label>
                <select
                  name='category'
                  value={categorySelected}
                  onChange={handleChangeCategory}
                  id='category'
                  className='form-select'
                >
                  {category.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
    
              <div className='form-signin w-50 m-auto mb-1'>
                <label className='form-label'>Produtos</label>
                <select
                  name='product'
                  value={productSelected}
                  onChange={handleChangeProduct}
                  id='product'
                  className='form-select'
                >
                  {products.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
    
              <div className='form-signin w-50 m-auto mb-1'>
                <Form.Group className="mb-1" controlId="nome">
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control type='number' placeholder='Quantidade do Item:' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
              </div>
    
             <button className="w-50 btn btn-lg btn-outline-success mb-2" type="submit">Adicionar Item</button>
          </div>  
          </Form>
          <button className="w-50 btn btn-lg btn-outline-danger mb-2" onClick={delOrder}>Excluir toda a Ordem</button>
        </Container>        

        <table className='table table-striped table-hover'>
          <thead className='table-dark mt-3'>
            <tr>
              <th scope='col'>NU</th>
              <th scope='col'>Produto</th>
              <th scope='col'>Foto</th>
              <th scope='col'>Quantidade</th>
              <th scope='col'>Preço</th>
              <th scope='col'>Total</th>
              <th scope='col'>Opções</th>
            </tr>
          </thead>
          <tbody>
            {ordersList
              .map(ordem => (
                <tr key={ordem.id}>
                  <td>{ordem.numerounico}</td>
                  <td>{ordem.product?.name}</td>
                  <td><img src={`http://localhost:3333/files/${ordem.product?.banner}`} width="40" height="40" /></td>
                  <td>{ordem.amount}</td>
                  <td>{ordem.product?.price}</td>
                  <td>{parseFloat(ordem.product?.price) * parseFloat(ordem.amount)}</td>
                  <td>
                    <div>
                      <Button
                        variant='btn btn-sm btn-outline-danger me-2'
                        onClick={() => delItem(ordem.id)}>
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

  const response = await apiClient.get('/orders/nopag');
  console.log(response.data);


  return {
    props: {
      orders: response.data
    }
  }
})
