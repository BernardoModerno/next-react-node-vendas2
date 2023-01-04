import '../../styles/globals.css'
import '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { AuthProvider } from '../contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <Component {...pageProps} />
       <ToastContainer autoClose={3000} />
    </AuthProvider>
   )
}

export default MyApp
