import { Button, TextField, Snackbar, Dialog, DialogContent, DialogTitle, Box, Alert } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { MenuButton, CustomSnackbar } from '.'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { AppStateContext } from '../context'

const LoginDialog = () => {
    const [AppState, setAppState] = useContext(AppStateContext)

    const [Open, setOpen] = useState(AppState.loginOpen)
    const [SignUp, setSignUp] = useState(false)
    const [Values, setValues] = useState({ login: '', password: '' })
    const [SignUpValues, setSignUpValues] = useState({ mail: '' })
    const [Cookies, setCookies] = useCookies(['token'])
    const dispatch = useDispatch()
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })

    const handleSignUp = () => {
        axios.post('/api/user', { ...Values, ...SignUpValues }).then((res) => {
            handleSignIn()
        })
    }

    useEffect(() => {
        setOpen(AppState.loginOpen)
    }, [AppState])

    const handleSignIn = () => {
        axios.post('/api/auth', Values).then((res) => {
            console.log(res.data)
            setSnackbarState({ message: res.data.text, open: true, error: false })
            setTimeout(() => {
                setCookies('token', res.data.token)
                dispatch({
                    type: "SET_USER", user: {
                        token: res.data.token,
                        name: res.data.name,
                        id: res.data.id,
                        providers: res.data.providers,
                        favourite: res.data.favourite,
                    }
                })
            }, 1000)
        }).catch((err) => {
            setSnackbarState({ message: err.response.data.text, open: true, error: true })
        })
    }

    const handleClose = () => {
        setOpen(false)
        setSignUp(false)
        setValues({ login: '', password: '' })
        setSignUpValues({ mail: '' })
    }
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            if(SignUp) handleSignUp()
            else handleSignIn()
        }

    }

    return (
        <>
            <MenuButton onClick={() => setOpen(true)}>Sign In</MenuButton>
            <Dialog maxWidth='md' open={Open} onClose={handleClose}>
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                        <TextField
                            value={Values.login}
                            onChange={(e) => setValues({ ...Values, login: e.target.value })}
                            onKeyDown={handleKeyPress}
                            label="Login"
                            fullWidth
                        />
                        <TextField
                            value={Values.password}
                            onChange={(e) => setValues({ ...Values, password: e.target.value })}
                            onKeyDown={handleKeyPress}
                            label="Password"
                            fullWidth
                            type="password"
                        />
                        {SignUp &&
                            <TextField
                                value={SignUpValues.mail}
                                onChange={(e) => setSignUpValues({ ...SignUpValues, mail: e.target.value })}
                                onKeyDown={handleKeyPress}
                                label="Mail"
                                fullWidth
                                type="email"
                            />
                        }
                        <Button onClick={SignUp ? handleSignUp : handleSignIn}>{SignUp ? "Sign Up" : 'Sign In'}</Button>
                        {!SignUp && <Button onClick={() => setSignUp(true)} >Sign Up</Button>}
                    </Box>
                </DialogContent>
                <CustomSnackbar key="loginMessage" snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
            </Dialog>

        </>
    )
}
export default LoginDialog