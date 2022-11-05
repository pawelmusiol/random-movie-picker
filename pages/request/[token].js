import { Container, Grid } from '@mui/material'
import { SingleList } from '../../components'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useContext, useState, useEffect } from 'react'
import { AppStateContext } from '../../context'
import axios from 'axios'

const Request = () => {
    const [AppState, setAppState] = useContext(AppStateContext)
    const router = useRouter()
    const { token } = router.query
    const User = useSelector(state => state.User)
    const [ListData, setListData] =useState({users: [], films:[]})

    useEffect(() => {
        if(!User.token.length){
            console.log('dupa')
            setAppState({...AppState, loginOpen: true})

        }
        else {
            AppState.loginOpen = false
            axios.get(`/api/list/${token}`).then(res => {
                setListData(res.data.list)
            })
        }
    }, [User])
    
    const acceptRequest = () => {
        axios.post(`/api/list/${ListData._id}/user/${User.id}`).then(res => {
            router.push('/list')
        })
    }

    return (
        <Container>{User.token.length ?
            <SingleList list={ListData} acceptRequest={acceptRequest} />
        : 'najpierw się zaloguj'}</Container>
    )
}

export default Request