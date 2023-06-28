import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { SingleList } from '..'
import useSetLists from './useSetLists'
import RequestDialog from './RequestDialog';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/hooks';

const ListsList = () => {

    const [DialogOpen, setDialogOpen] = useState(false)
    const [RequestLink, setRequestLink] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useAppSelector(state => state.User)
    let userId = user.id

    let lists = useSetLists()
    const deleteList = (id:string) => {

        axios.delete(`/api/list/${id}?token=${user.token}`).then(res => {
            dispatch({ type: 'SET_LISTS', lists: res.data.lists })
        })
    }
    const inviteUser = (id:string) => {
        let currentUrl = ''
        if (document) {
            document.URL.split('/').map((s, i, arr) => {
                if (i < arr.length - 1) currentUrl += s + '/'
            })
            console.log(currentUrl)
        }
        console.log('dupa')
        axios.get(`/api/list/${id}/request?token=${user.token}`).then(res => {
            setRequestLink(currentUrl + 'request/' + res.data.token)
            setDialogOpen(true)
        })
    }
    const switchPrivacy = (id:string, privacy:boolean) => {
        axios.put(`/api/list/${id}/privacy?token=${user.token}`, { id: id, privacy: privacy, userId: userId }).then(
            res => dispatch({ type: 'SET_LISTS', lists: res.data.lists })
        )

    }

    const checkIfUserIsAdmin = (list:list) => {
        return list.users.find(user => user._id === userId && user.isAdmin === true)

    }

    return (
        <Grid container spacing={3}>
            <RequestDialog open={DialogOpen} setOpen={setDialogOpen} link={RequestLink} />
            {lists.map((list, i) =>
                <SingleList
                    key={i}
                    list={list}
                    onRequest={() => inviteUser(list._id)}
                    onDelete={checkIfUserIsAdmin(list) ? () => deleteList(list._id) : null}
                    onSwitchPrivacy={() => switchPrivacy(list._id, list.private)}
                />
            )}
        </Grid>
    )
}



export default ListsList