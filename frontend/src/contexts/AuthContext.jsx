import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export function signOut(){
    try{
      destroyCookie(undefined, '@nextauth.token')
      toast.info('Deslogando usuário!')
      Router.push('/')
    }catch{
      console.log('erro ao deslogar')
    }
  }

export function AuthProvider({ children }){
  const [user, setUser] = useState()
  const isAuthenticated = !!user;

  useEffect(() => {

    // tentar pegar algo no cookie
    const { '@nextauth.token': token } = parseCookies();

    if(token){
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })

      })
      .catch(() => {
        //Se deu erro deslogamos o user.
        signOut();
      })
    }


  }, [])

  async function signIn({ email, password }){
    try{
        const response = await api.post('/session', {
          email,
          password
        })
         console.log(response.data);
  
        const { id, name, token } = response.data;
  
        setCookie(undefined, '@nextauth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
          path: "/" // Quais caminhos terao acesso ao cookie
        })
  
        setUser({
          id,
          name,
          email,
        })
  
        //Passar para proximas requisiçoes o nosso token
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        toast.success('Logado com sucesso!')
  
        //Redirecionar o user para /dashboard
        Router.push('/dashboard')
  
  
      }catch(err){
        console.log("ERRO AO ACESSAR ", err)
      }
  }

  async function signUp({ name, email, password}){
    try{

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log("CADASTRADO COM SUCESSO!")
      toast.success("Conta criada com sucesso!")

      Router.push('/')

    }catch(err){
      toast.error("Erro ao acessar!")
      console.log("erro ao cadastrar ", err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
} 