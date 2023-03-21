import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProvidersSubscriptions, UserData, Favourite } from '../../components'
import { useSelector } from 'react-redux'
import { Box, Grid, styled } from '@mui/material'

const MainBox = styled(Box)(({theme}) => ({
    display: 'flex', 
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]:{
        flexDirection: 'column',
    }
}))

const UserPage = () => {

    const [UserInfo, setUserInfo] = useState({ ready: false })
    const user = useSelector(state => state.User)
    useEffect(() => {
        axios.get(`/api/user/${user.id}`).then(res => {
            setUserInfo({ ...res.data, ready: true })
        }).catch(err => {
            console.log(err.response.status)
            setUserInfo({ ready: false, error: true })
        })
    }, [user.id])
    console.log(user.favourite)
    return (
        <>
            <MainBox>
                <UserData userInfo={UserInfo} />
                <ProvidersSubscriptions id={user.id} providers={user.providers} />
            </MainBox>
            <Favourite data={user.favourite} userId={user.id} />
        </>
    )
}

export default UserPage