import { BagProvider } from '../context/CartContext'
import '../styles/index.css'

function MyApp ({ Component, pageProps }) {
  return (
    <BagProvider>
      <Component {...pageProps} />
    </BagProvider>
  )
}

export default MyApp
