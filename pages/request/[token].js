import { Container, Grid } from '@mui/material'
import { SingleList } from '../../components'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import { AppStateContext } from '../../context'
import axios from 'axios'

const Request = () => {
    const [AppState, setAppState, openSnackbar] = useContext(AppStateContext)
    const router = useRouter()
    const { token } = router.query
    const user = useSelector(state => state.User)
    const [ListData, setListData] =useState({users: [], films:[]})

    useEffect(() => {
        if(!user.token.length){
            console.log('dupa')
            setAppState({...AppState, loginOpen: true})

        }
        else {
            AppState.loginOpen = false
            console.log(token)
            axios.get(`/api/list/${token}`).then(res => {
                setListData(res.data.list)
            })
        }
    }, [user, token])
    
    const acceptRequest = () => {
        axios.post(`/api/list/${ListData._id}/user/${user.token}`).then(res => {
            router.push('/list')
        }).catch(err => {
            openSnackbar({message: err.response.data.message, error: true})
        })
    }

    return (
        <Container>{user.token.length ?
            <SingleList list={ListData} acceptRequest={acceptRequest} />
        : 'najpierw się zaloguj'}</Container>
    )
}

export default Request