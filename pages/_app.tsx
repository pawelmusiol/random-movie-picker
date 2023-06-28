import { MainLayout } from '../layouts'
import { CookiesProvider } from 'react-cookie'
import Store from '../redux/store'
import { Provider } from 'react-redux'
import ContextProvider from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={Store} >
      <ContextProvider>
        <CookiesProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </CookiesProvider>
      </ContextProvider>
    </Provider>
  )
}

export default MyApp
