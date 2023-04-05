import { useState } from 'react'
import { Menu, MenuItem, Button, styled } from '@mui/material'
import { CustomSnackbar, CreateList } from '.'
import { useAppContext } from '../context'
import { Add } from '../icons'
import axios from 'axios'
import { useSelector } from 'react-redux'

const AddButton = styled('img')(({ theme }) => ({
    cursor: 'pointer',
    float: 'right',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
}))

const AddMenu = ({ lists, film, user }) => {
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })
    const [AnchorEl, setAnchorEl] = useState(null)
    const [context, setContext] = useAppContext()
    const [CreateListOpen, setCreateListOpen] = useState(false)
    const handleClose = () => {
        setAnchorEl(null)
    }



    const AddFilm = (id) => {
        axios.post(`/api/list/${id}/film?token=${user.token}`, { user: user, film: film }).then(res => {
            setSnackbarState({ open: true, message: res.data.text })
        })
        handleClose()
    }
    const OpenModal = () => {
        setContext({ ...context, loginOpen: true })
    }

    return (
        <>
            <CreateList open={CreateListOpen} onClose={() => setCreateListOpen(false)} addToList={AddFilm} />
            <AddButton src={Add.src} onClick={e => setAnchorEl(e.currentTarget)} />
            <CustomSnackbar key="FilmAdd" snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
            <Menu
                disableEnforceFocus
                disableRestoreFocus
                disableAutoFocus
                disableAutoFocusItem
                anchorEl={AnchorEl}
                id='add-menu'
                open={Boolean(AnchorEl)}
                onClose={handleClose}
            >
                {lists.map((list, i) => <MenuItem
                    onClick={() => AddFilm(list._id)}
                    key={i}
                >
                    {list.name}
                </MenuItem>)}
                
                {user.token ? <MenuItem onClick={handleClose}>
                    <Button sx={{ padding: 1, minWidth: 0 }} onClick={() => setCreateListOpen(true)}>
                        <AddButton src={Add.src} />
                    </Button></MenuItem>
                    :
                    <MenuItem
                        onClick={OpenModal}
                        key={'login'}
                    >
                        Log In
                    </MenuItem>
                }
            </Menu>
        </>
    )
}

export default AddMenu