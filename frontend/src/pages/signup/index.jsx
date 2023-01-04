import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import logoImg from '../../../public/vendas1.png';
import { useState, useContext } from 'react'
import Head from 'next/head';
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import Link from 'next/link';
import '../../components/login/login.module.css';



export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const [loading, setLoading] = useState(false);
  
    async function handleSignUp(event){
      event.preventDefault();
  
      if(name === '' || email === '' || password === ''){
        toast.error("Preencha todos os campos")
        return;
      }
  
      setLoading(true);

      let data = {
        name,
        email,
        password
      }
  
      await signUp(data)
  
      setLoading(false);
  
    }

    return (
        <>
          <Head>
           <title>Sistema de vendas</title> 
          </Head>
        <section className="vh-100 gradient-custom">
          <div className="container py-1 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                  <div className="card-body p-5 text-center">
                    <Form onSubmit={handleSignUp}>
                      <Image src={logoImg} alt="Vendas" width="72" height="57" />
                      <div className="mb-md-1 mt-md-1 pb-5">


                        <h2 className="fw-bold mb-2 text-uppercase">Registro</h2>
                        <p className="text-white-50 mb-2">Entre com seu dados</p>

                        <div className="form-outline form-white mb-4">
                          <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="typeTextX" className="form-control form-control-lg" placeholder="Nome Completo" />
                          <label className="form-label" for="typeTextX">Nome</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="name@example.com" />
                          <label className="form-label" for="typeEmailX">Email</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Password" />
                          <label className="form-label" for="typePasswordX">Senha</label>
                        </div>


                        <button className="btn btn-outline-light btn-lg px-5" type="submit" loading={loading}>Confirmar</button>

                      </div>
                    </Form>
                    <div>
                      <p className="mb-0">Já tenho cadastro <Link href='/'>Voltar</Link>
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