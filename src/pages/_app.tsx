import type { AppProps } from 'next/app'
import { AuthProvider } from './auth';
import Layout from '$/components/Layout'

import '../styles/globals.css'



function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default App
