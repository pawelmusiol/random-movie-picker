import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppContext } from '../../context'

const Movie = () => {

    const router = useRouter()
    const [Data, setData] = useState({})
    const [AppState] = useAppContext()

    useEffect(() => {
        console.log(router.query)
        const { id } = router.query
        if (id !== undefined) {
            axios.get(`/api/movie/${id}?language=${AppState.language}`).then(res => setData(res.data))
        }
    }, [router])

    return (
        <p>movie</p>
    )

}

export default Movie