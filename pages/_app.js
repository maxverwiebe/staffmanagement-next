
//import Layout from '../components/layout'
import '../app/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-neutral-900 min-h-screen'>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp