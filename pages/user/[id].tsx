import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProvidersSubscriptions, UserData, Favourite } from '../../components'
import { useSelector } from 'react-redux'
import { Box, Grid, styled } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}))

interface IUserInfo {
    email?: string,
    isOwner?: boolean,
    name?: string,
    ready: boolean
}

const UserPage = () => {

    const [UserInfo, setUserInfo] = useState<IUserInfo>({ ready: false })
    const user = useAppSelector(state => state.User)
    const router = useRouter()
    const { id } = router.query
    let userId = (id as unknown) as string
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
                    <ProvidersSubscriptions id={userId} providers={user.providers} />
                }
            </MainBox>
            <Favourite userId={userId} token={user.token} />
        </>
    )
}

export default UserPage