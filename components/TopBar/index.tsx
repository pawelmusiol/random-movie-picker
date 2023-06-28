import { AppBar, Typography, Toolbar, Box, Menu, MenuItem, useTheme, useMediaQuery, TextField } from '@mui/material'
import { MenuButton, LoginDialog } from '../'
import HamburgerIcon from './HamburgerIcon'
import MobileMenu from './MobileMenu'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import SearchBox from './SearchBox'
import { useAppSelector } from '../../redux/hooks'

const TopBar = () => {
    const [Open, setOpen] = useState(false)
    const theme = useTheme()
    const Pages = [
        { text: 'Start', href: '/' },
        { text: 'Search', href: '/search' },
        { text: 'Discover', href: '/discover' },
        { text: 'Lists', href: '/list', auth: true },
    ]
    const User = useAppSelector(state => state.User)
    console.log(Open)
    return (
        <AppBar component="nav" >
            <Toolbar >
                <Box sx={{ flexGrow: 1, flexDirection: 'row', display: "flex" }} >
                    {useMediaQuery(theme.breakpoints.down('md')) ?
                        <>
                            <HamburgerIcon open={Open} onClick={() => setOpen(!Open)} />
                            <MenuButton sx={{ zIndex: 2000 }} onClick={() => setOpen(false)} href={Pages[0].href}>{Pages[0].text}</MenuButton>
                            <MobileMenu open={Open}>
                                {Pages.map((page, i) => {
                                    if (i !== 0) {
                                        if (!page.auth) {
                                            return <MenuButton onClick={() => setOpen(false)} href={page.href} key={page.href}>{page.text}</MenuButton>
                                        }
                                        else {
                                            if (User.name) return <MenuButton onClick={() => setOpen(false)} href={page.href} key={page.href}>{page.text}</MenuButton>
                                        }
                                    }
                                })}
                            </MobileMenu>
                        </>
                        :
                        <>
                            {Pages.map(page => {
                                if (!page.auth) {
                                    return <MenuButton href={page.href} key={page.href}>{page.text}</MenuButton>
                                }
                                else {
                                    if (User.name) return <MenuButton href={page.href} key={page.href}>{page.text}</MenuButton>
                                }
                            })}
                            <SearchBox />
                        </>}
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
                disableEnforceFocus
                disableRestoreFocus
                disableAutoFocus
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