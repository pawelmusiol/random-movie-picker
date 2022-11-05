import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const UserPage = () => {

    const [UserData, setUserData] = useState({ ready: false })
    const router = useRouter()
    useEffect(() => {
        if (router.query.id) {
            axios.get(`/api/user/${router.query.id}`).then(res => {
                setUserData({ ...res.data, ready: true })
            }).catch(err => {
                console.log(err.response.status)
                setUserData({ ready: false, error: true })
            })
        }
    }, [router.query.id])



    return (
        <>
            {(UserData.ready && !UserData.error) ?
                <>user</>
                :
                <>Brak Danych</>
            }
            {UserData.error && <>Błąd</>}
        </>
    )
}

export default UserPage