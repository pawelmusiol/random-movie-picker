import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Dialog, DialogTitle, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { SingleList } from '..'
import useSetLists from './useSetLists'

const ListsList = () => {

    const [DialogOpen, setDialogOpen] = useState(false)
    const [RequestLink, setRequestLink] = useState('')
    const UserId = useSelector(state => state.User.id)
    const dispatch = useDispatch()
    let lists = useSetLists()
    const deleteList = (id) => {
        axios.delete(`/api/list/${id}`, { headers: { userId: UserId } }).then(res => {
            dispatch({ type: 'SET_LISTS', lists: res.data.lists })
        })
    }
    const inviteUser = (id) => {
        axios.get(`/api/list/${id}/request`).then(res => {
            setRequestLink('localhost:3000/request/' + res.data.token)
            setDialogOpen(true)
        })
    }

    const checkIfUserIsAdmin = (list) => {
        return list.users.find(user => user._id === UserId && user.isAdmin === true)
        
    }

    return (
        <Grid container spacing={3}>
            <RequestDialog open={DialogOpen} setOpen={setDialogOpen} link={RequestLink} />
            {lists.map((list, i) =>
                <SingleList
                    key={i}
                    list={list}
                    onRequest={() => inviteUser(list._id)}
                    onDelete={checkIfUserIsAdmin(list) ? () => deleteList(list._id) : null} />
            )}
        </Grid>
    )
}

const RequestDialog = ({ open, setOpen, link }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Send this link to your friends</DialogTitle>
            <Typography variant="body1">{link}</Typography>
        </Dialog>
    )
}

export default ListsList