import { parseCookies } from 'nookies'

//funcao para paginas que só pode ser acessadas por visitantes
export function canSSRGuest(fn) {
  return async (ctx) => {

    const cookies = parseCookies(ctx);

    // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if(cookies['@nextauth.token']){
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx);
  }

}