import { useState } from 'react'
import { Menu, MenuItem, styled } from '@mui/material'
import { CustomSnackbar, CreateList } from '.'
import { Add } from '../icons'
import axios from 'axios'

const AddButton = styled('img')(({ theme }) => ({
    cursor: 'pointer',
    float: 'right',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
}))

const AddMenu = ({ lists, film, user }) => {
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })
    const [AnchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null)
    }
    const AddFilm = (id) => {
        axios.post(`/api/list/${id}/film`, { user: user, film: film }).then(res => {
            setSnackbarState({ open: true, message: res.data.text })
        })
        handleClose()
    }

    return (
        <>
            <AddButton src={Add.src} onClick={e => setAnchorEl(e.currentTarget)} />
            <CustomSnackbar key="FilmAdd" snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
            <Menu
                anchorEl={AnchorEl}
                id='add-menu'
                open={Boolean(AnchorEl)}
                onClose={handleClose}
            >
                {lists.map((list, i) => <MenuItem onClick={() => AddFilm(list._id)} key={i}>{list.name}</MenuItem>)}
                {lists[0].name !== 'Log In' && <MenuItem><CreateList /></MenuItem>}
            </Menu>
        </>
    )
}

export default AddMenu