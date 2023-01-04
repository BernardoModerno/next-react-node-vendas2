import React, { useState } from 'react'
import Head from 'next/head';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Button, Container, Form } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import { Wrapper } from '../../components/wrapper';
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api'

export default function CreateCategory(){
  const [name, setName] = useState('')

  async function handleRegister(event){
    event.preventDefault();

    if(name === ''){
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso!')

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
                 <Form onSubmit={handleRegister}>
                   <div className='form-signin w-50 m-auto'>
                     <Form.Group className="mb-3" controlId="nome">
                       <Form.Label>Categoria:</Form.Label>
                       <Form.Control type='text' placeholder='Digite Nova Categoria:' value={name} onChange={ (e) => setName(e.target.value)} />
                     </Form.Group>
                   </div>
                   <button className="w-50 btn btn-lg btn-outline-success" type="submit">Cadastrar Categoria</button>
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


  return {
    props: {
    }
  }
})

