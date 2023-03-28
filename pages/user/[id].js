import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProvidersSubscriptions, UserData, Favourite } from '../../components'
import { useSelector } from 'react-redux'
import { Box, Grid, styled } from '@mui/material'

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}))

const UserPage = () => {

    const [UserInfo, setUserInfo] = useState({ ready: false })
    const user = useSelector(state => state.User)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        console.log(user.token)
        if (router.isReady && typeof id !== 'undefined' && user.token.length) {
            axios.get(`/api/user/${id}?token=${user.token}`).then(res => {
                setUserInfo({ ...res.data, ready: true })
            }).catch(err => {
                router.push('/404')
            })
        }
    }, [id, user.token])
    console.log(user.favourite)
    return (
        <>
            <MainBox>
                <UserData userInfo={UserInfo} />
                {UserInfo.isOwner &&
                    <ProvidersSubscriptions id={id} providers={user.providers} />
                }
            </MainBox>
            <Favourite data={user.favourite} userId={id} token={user.token} />
        </>
    )
}

export default UserPage