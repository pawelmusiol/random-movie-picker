import { AppBar, Typography, Toolbar, Box, Menu, MenuItem, Button } from '@mui/material'
import { MenuButton, LoginDialog } from '.'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const TopBar = () => {
    const Pages = [
        { text: 'Start', href: '/' },
        { text: 'Search', href: '/search' },
        { text: 'Discover', href: '/discover' },
        { text: 'Lists', href: '/list', auth: true },
    ]
    const User = useSelector(state => state.User)
    return (
        <AppBar component="nav" >
            <Toolbar>
                <Box sx={{ flexGrow: 1, flexDirection: 'row', display: "flex" }} >
                    {Pages.map(page => {
                        if (!page.auth) {
                            return <MenuButton href={page.href} key={page.href}>{page.text}</MenuButton>
                        }
                        else {
                            if (User.name) return <MenuButton href={page.href} key={page.href}>{page.text}</MenuButton>
                        }
                    })}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    {User.name === ''
                        ? <LoginDialog />
                        : <UserMenu user={User} />
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

const UserMenu = ({ user }) => {
    const [Cookies, setCookie, removeCookie] = useCookies(['token'])
    const dispatch = useDispatch()
    const router = useRouter()
    const [AnchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const logout = () => {
        removeCookie('token')
        dispatch({ type: 'CLEAR_USER' })
        dispatch({ type: 'CLEAR_LISTS' })
        router.push('/')
        handleClose()
    }
    return (
        <>
            <MenuButton onClick={e => setAnchorEl(e.currentTarget)}>{user.name}</MenuButton>
            <Menu
                anchorEl={AnchorEl}
                id='user-menu'
                open={Boolean(AnchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); router.push(`/user/${user.id}`) }}>
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <Typography>Log Out</Typography>
                </MenuItem>
            </Menu>
        </>
    )

}

export default TopBar