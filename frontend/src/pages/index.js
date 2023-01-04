import '../../styles/Home.module.css';
import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../../public/vendas.svg';
import { Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { canSSRGuest } from '../utils/canSSRGuest'
import Link from 'next/link';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error("Preencha os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
        <>
        <Head>
          <title>Sistema de Vendas</title> 
        </Head>

        <Container className='container text-center dark mt-5'>
          <div class="row">
            <main className="form-signin w-50 m-auto">
              <Form onSubmit={handleLogin}>
                <Image src={logoImg} alt="Vendas" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Entre com seus dados:</h1>
            
                <div className="form-floating">
                  <input value={email} onChange={ (e) => setEmail(e.target.value)} type="email" className="form-control mb-2" id="floatingInput" placeholder="name@example.com"/>
                  <label for="floatingInput">Email:</label>
                </div>
                <div className="form-floating sm">
                  <input value={password} onChange={ (e) => setPassword(e.target.value) } type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password" />
                  <label for="floatingPassword">Senha:</label>
                </div>
            
                <button className="w-100 btn btn-lg btn-primary mb-2" type="submit" loading={loading}>Entrar</button>
              </Form>
              <Link href='/signup'>Registrar-me</Link>
            </main>
         </div>
       </Container>

       </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})