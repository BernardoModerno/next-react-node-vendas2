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

export default function EditCategory({categorys}){
    const router = useRouter();
    const parametroApenasParaTeste = router.query.id;
    const [name, setName] = useState('')

    useEffect(() => {
      async function loadCategories() {
          const apiClient = setupAPIClient();
    
          const response = await apiClient.get(`category/${router.query.id}`);
          setName(response.data.name)
  
      }
        
      loadCategories()
  }, [])
  
    async function handleEdit(event){
      event.preventDefault();
  
      const apiClient = setupAPIClient();

      await apiClient.put(`category/${router.query.id}`, {
        name,
    });
  
      toast.success('Categoria editada com sucesso!')
  
      setName('');
      Router.push('/category')
  
    }
    return (
      <>
         <Head>
                  <title>Nova Categoria</title>
         </Head>
         <Wrapper>
           <Container className='container text-center mt-5'>
                   <Form onSubmit={handleEdit}>
                     <div className='form-signin w-50 m-auto'>
                       <Form.Group className="mb-3" controlId="nome">
                         <Form.Label>Categoria:</Form.Label>
                         <Form.Control type='text' defaultValue={name} value={name} onChange={ (e) => setName(e.target.value)} />
                       </Form.Group>
                     </div>
                     <button className="w-50 btn btn-lg btn-outline-success" type="submit">Editar Categoria</button>
                   </Form>
                   <Link href='/category'>
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
        categorys: response.data
      }
    }
  })