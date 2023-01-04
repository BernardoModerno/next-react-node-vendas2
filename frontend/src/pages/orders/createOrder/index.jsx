import React, { useState } from 'react'
import Head from 'next/head';
import { canSSRAuth } from '../../../utils/canSSRAuth'
import { Button, Container, Form } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import { Wrapper } from '../../../components/wrapper';
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../../services/api'

export default function CreateProduct({categoryList}){
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)
  function handleFile(e){
    if(!e.target.files){
      return;
    }
    const image = e.target.files[0];
    if(!image){
      return;
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImageAvatar(image);
    }
  }
  //Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event){
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
   //console.log('Categoria selecionada ', categories[event.target.value])
    setCategorySelected(event.target.value)

  }

  async function handleRegister(event){
    event.preventDefault();

    try{
      const data = new FormData();

      if(name === '' || price === '' || description === '' || imageAvatar === null){
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Cadastrado com sucesso!')

    }catch(err){
      console.log(err);
      toast.error("Ops erro ao cadastrar!")
    }

    setName('');
    setPrice('');
    setDescription('')
    setImageAvatar(null);
    Router.push('/products')

  }
      return (
        <>
           <Head>
                    <title>Novo Produto</title>
           </Head>
           <Wrapper>
             <Container className='container text-center mt-3'>
                     <Form onSubmit={handleRegister}>
                       <div className='form-signin w-50 m-auto'>
                         <Form.Group className="mb-2" controlId="nome">
                           <Form.Label>Nome do Produto:</Form.Label>
                           <Form.Control type='text' placeholder='Digite nome do produto:' value={name} onChange={ (e) => setName(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="mb-2" controlId="description">
                           <Form.Label>Descrição do Produto:</Form.Label>
                           <Form.Control type='text' placeholder='Digite descrição do produto:' value={description} onChange={ (e) => setDescription(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="mb-2" controlId="price">
                           <Form.Label>Preço do Produto:</Form.Label>
                           <Form.Control type='text' placeholder='Digite o preço do produto:' value={price} onChange={ (e) => setPrice(e.target.value)} />
                         </Form.Group>
                         <div className='col-md-12 mb-2'>
                              <label className='form-label'>Categorias</label>
                              <select
                                  name='category'
                                  value={categorySelected}
                                  onChange={handleChangeCategory}
                                  id='category'
                                  className='form-select'
                              >
                               {categories.map( (item, index) => {
                                 return(
                                  <option key={item.id} value={index}>
                                       {item.name}
                                  </option>
                                 )
                               })}
                              </select>
                        </div>
                        <Form.Group controlId="formFile" className="mb-3">
                           <Form.Label>Escolha Imagem de Produto:</Form.Label>
                           <Form.Control type="file" onChange={handleFile} />
                        </Form.Group>
                       </div>
                       <button className="w-50 btn btn-lg btn-outline-success" type="submit">Cadastrar Produto</button>
                     </Form>
                     <Link href='/products'>
                       <Button className='w-50 btn btn-lg btn-danger mt-2' >
                         Retornar
                       </Button>
                     </Link>
             </Container>
          </Wrapper>
        </>
      )
    }

    export const getServerSideProps = canSSRAuth(async (ctx) => {
        const apliClient = setupAPIClient(ctx)
        const response = await apliClient.get('/category');
        //console.log(response.data);
        return {
          props: {
            categoryList: response.data
          }
        }
      })

