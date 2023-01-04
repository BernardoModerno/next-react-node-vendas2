import '../components/login/login.module.css';
import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../../public/vendas1.png';
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

      <section className="vh-100 gradient-custom">
        <div className="container py-1 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">
                  <Form onSubmit={handleLogin}>
                    <Image src={logoImg} alt="Vendas" width="72" height="57" />
                     <div className="mb-md-5 mt-md-4 pb-5">
   
   
                       <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                       <p className="text-white-50 mb-5">Entre com seu email e senha</p>
   
                       <div className="form-outline form-white mb-4">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="name@example.com" />
                         <label className="form-label" for="typeEmailX">Email</label>
                       </div>
   
                       <div className="form-outline form-white mb-4">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Password" />
                         <label className="form-label" for="typePasswordX">Senha</label>
                       </div>
   
 
                      <button className="btn btn-outline-light btn-lg px-5" type="submit" loading={loading}>Login</button>
   
                     </div>
                  </Form>
                     <div>
                    <p className="mb-0">Não tem conta? <Link href='/signup'>Registrar-me</Link>
                       </p>
                     </div>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})