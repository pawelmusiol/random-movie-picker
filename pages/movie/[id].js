import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppContext } from '../../context'
import { StreamingProviders, MovieHeader, MovieMedia, Cast, MovieInfo } from '../../components'
import { Typography } from '@mui/material'

const Movie = () => {

    const router = useRouter()
    const [Data, setData] = useState(null)
    const [AppState] = useAppContext()

    useEffect(() => {
        const { id } = router.query
        if (id !== undefined) {
            axios.get(`/api/movie/${id}?language=${AppState.language}`).then(res => setData(res.data))
        }
    }, [router])

    return (
        <>
        {Data ?
        <>
        {console.log(Data)}
        <MovieHeader {...Data.details} />
        <MovieInfo {...Data.info} />
        <MovieMedia {...Data.media}/>
        <StreamingProviders providers={Data.providers} /> 
        <Cast cast={Data.credits.cast} />
        </>
        :
        <Typography>Loading</Typography>
        }
        </>
    )

}

export default Movie