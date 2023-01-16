import { Container, CssBaseline } from '@mui/material'
import { TopBar } from '../components'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: "#06AED5",
        },
        secondary: {
            main: '#F0C808',
        },

    },
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
                console.log(res.data)
                dispatch({ type: 'SET_USER', user: { token: cookies.token, name: res.data.name, id: res.data.id, providers: res.data.providers } })
            }).catch(err => {
                if (err.response.status === 401) removeCookie('token')
                dispatch({ type: 'CLEAR_USER' })
                dispatch({ type: 'CLEAR_LISTS' })
                checkForAuth(router)
            })
        }
        else checkForAuth(router)
    }, [router.pathname])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth={router.pathname !== '/' ? "lg" : false}
                disableGutters={router.pathname !== '/' ? false : true}
                sx={{ marginTop: 8, }}>
                <TopBar />
                {children}
            </Container>
        </ThemeProvider>
    )
}

export default MainLayout