import { Container, CssBaseline, useTheme, useMediaQuery } from '@mui/material'
import { CustomSnackbar, NotFound, TopBar } from '../components'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextRouter, useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material'
import { useAppContext } from '../context'

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
        //'user',
        'list',
    ]
    const checkForAuth = (router: NextRouter) => {
        AuthPages.forEach(p => {
            if (router.pathname.includes(p)) {
                router.push('/')
            }
        })
    }

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const dispatch = useDispatch()
    const router = useRouter()
    console.log(router.pathname)
    const uTheme = useTheme()
    const mobile = useMediaQuery(uTheme.breakpoints.down('md'))
    const { context } = useAppContext()
    console.log(context)
    useEffect(() => {
        if (cookies.token) {
            axios.get(`/api/auth?token=${cookies.token}`).then(res => {
                console.log(res.data)
                dispatch({
                    type: 'SET_USER',
                    user: {
                        token: cookies.token,
                        name: res.data.name,
                        id: res.data.id,
                        providers: res.data.providers,
                        favourite: res.data.favourite
                    }
                })
            }).catch(err => {
                if (err.response.status === 401) removeCookie('token')
                dispatch({ type: 'CLEAR_USER' })
                dispatch({ type: 'CLEAR_LISTS' })
                checkForAuth(router)
            })
        }
        else checkForAuth(router)
    }, [router.pathname])

    const setTopMargin = () => {
        if (router.pathname === '/') return 0
        else {
            if (mobile) return 23
            else return 10
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth={router.pathname !== '/' ? "lg" : false}
                disableGutters={router.pathname !== '/' ? false : true}
                sx={{
                    marginTop: setTopMargin,
                    backgroundColor: router.pathname === '/' ? '#111' : '',
                    color: router.pathname === '/' ? '#eee' : '',
                    overflowX: 'hidden',
                }}>
                <TopBar />
                {children}
                {/* <CustomSnackbar /> */}
            </Container>
        </ThemeProvider>
    )
}

export default MainLayout