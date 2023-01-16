import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProvidersSubscriptions } from '../../components'
import { useSelector } from 'react-redux'

const UserPage = () => {

    //const [UserData, setUserData] = useState({ ready: false })
    const user = useSelector(state => state.User)
    /* useEffect(() => {
        if (router.query.id) {
            axios.get(`/api/user/${router.query.id}`).then(res => {
                setUserData({ ...res.data, ready: true })
            }).catch(err => {
                console.log(err.response.status)
                setUserData({ ready: false, error: true })
            })
        }
    }, [router.query.id]) */


    return (
        <>
            <ProvidersSubscriptions id={user.id} providers={user.providers} />

        </>
    )
}

export default UserPage