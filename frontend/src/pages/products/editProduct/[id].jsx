import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { setupAPIClient } from '../../../services/api'
import { canSSRAuth } from '../../../utils/canSSRAuth'
import { Button, Container, Form, Input } from 'react-bootstrap';
import Link from 'next/link';
import { Wrapper } from '../../../components/wrapper';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';
import Router from 'next/router';

export default function EditCategory({categoryList}){
    const router = useRouter();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState()
  
    useEffect(() => {
      async function loadProducts() {
          const apiClient = setupAPIClient();
    
          const response = await apiClient.get(`product/${router.query.id}`);
          setName(response.data.name)
          setDescription(response.data.description)
          setPrice(response.data.price)
          setCategorySelected(response.data.category_id)
          setImageAvatar(response.data.banner)
  
      }
        
      loadProducts()
  }, [])

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

  function handleChangeCategory(event){
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
   //console.log('Categoria selecionada ', categories[event.target.value])
    setCategorySelected(event.target.value)

  }
  
    async function handleEdit(event){
      event.preventDefault();

    try{
      const data = new FormData();

      if(name === '' || price === '' || description === ''){
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.put(`product/${router.query.id}`, data);

      toast.success('Editado com sucesso!')

    }catch(err){
      console.log(err);
      toast.error("Ops erro ao editar!")
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
                  <title>Editar Produto</title>
         </Head>
         <Wrapper>
         <Container className='container text-center mt-3'>
                     <Form onSubmit={handleEdit}>
                       <div className='form-signin w-50 m-auto'>
                         <Form.Group className="mb-2" controlId="nome">
                           <Form.Label>Editar nome Produto:</Form.Label>
                           <Form.Control type='text' value={name} onChange={ (e) => setName(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="mb-2" controlId="description">
                           <Form.Label>Editar Descrição do Produto:</Form.Label>
                           <Form.Control type='text' value={description} onChange={ (e) => setDescription(e.target.value)} />
                         </Form.Group>
                         <Form.Group className="mb-2" controlId="price">
                           <Form.Label>Editar Preço do Produto:</Form.Label>
                           <Form.Control type='text' value={price} onChange={ (e) => setPrice(e.target.value)} />
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
                       <button className="w-50 btn btn-lg btn-outline-success" type="submit">Editar Produto</button>
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
    const apiClient = setupAPIClient(ctx);
  
    const response = await apiClient.get('/category');
    console.log(response.data);
  
  
    return {
      props: {
        categoryList: response.data
      }
    }
  })