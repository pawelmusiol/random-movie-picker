import { Card, Grid, Typography, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Add } from '../icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CustomSnackbar, CreateList } from '.'

import Link from 'next/link'
import axios from 'axios'

const IMG = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
})

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
                <MenuItem><CreateList /></MenuItem>
            </Menu>
        </>
    )
}

const SingleResult = ({ id, genres, posterPath, voteAverage, type, title, lists }) => {
    const user = useSelector(state => state.User)
    return (
        <Grid item sx={{ minWidth: "100%" }}>

            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Link href={`/${type}/${id}`}>
                            <IMG src={`https://image.tmdb.org/t/p/w500/${posterPath}`} />
                        </Link>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={2} flexDirection="row" sx={{ height: "100%" }}>
                            <Grid item xs={10}>
                                <Link href={`/${type}/${id}`}>
                                    <Typography variant="h4" sx={{ cursor: "pointer" }}>{title}</Typography>
                                </Link>
                                <Typography variant="h4">{voteAverage}</Typography>
                                <Typography variant="h4">{genres[0]}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ minWidth: "90%" }}>
                                <AddMenu film={{ id: id, name: title, type: type }} user={user} lists={lists} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default SingleResult