import AppContext from '../context/AppContext'
import { BagProvider } from '../context/CartContext'
import '../styles/index.css'
import AuthProvider from '../context/AuthProvider';

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BagProvider>
        <Component {...pageProps} />
      </BagProvider>
    </AuthProvider>
  )
}

export default MyApp
