import { Container, CssBaseline } from '@mui/material'
import { TopBar } from '../components'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }
            }
        }
    }
})

const MainLayout = ({ children }) => {

    const AuthPages = [
        'user',
        'list',
    ]
    const checkForAuth = (router) => {
        AuthPages.forEach(p => {
            if (router.pathname.includes(p)) {
                router.push('/')
            }
        })
    }

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (cookies.token) {
            axios.get(`/api/auth?token=${cookies.token}`).then(res => {
                dispatch({ type: 'SET_USER', user: { token: cookies.token, name: res.data.name, id: res.data.id } })
            }).catch(err => {
                if (err.response.status === 401) removeCookie('token')
                dispatch({ type: 'CLEAR_USER' })
                dispatch({ type: 'CLEAR_LISTS'})
                checkForAuth(router)
            })
        }
        else checkForAuth(router)
    }, [router.pathname])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 10 }}>
                <TopBar />
                {children}
            </Container>
        </ThemeProvider>
    )
}

export default MainLayout