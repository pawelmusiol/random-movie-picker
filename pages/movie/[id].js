import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppContext } from '../../context'
import { StreamingProviders, MovieHeader, MovieMedia, MovieInfo, SimilarFilms, Carousel, LoadingAnimation } from '../../components'
import { Typography, Grid, Box, styled } from '@mui/material'

const InfoGrid = styled(Grid)(({ theme }) => ({
    justifyContent: 'space-between',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
}))

const Movie = () => {

    const router = useRouter()
    const [Data, setData] = useState({ ready: false })
    const [AppState, setAppState] = useAppContext()

    useEffect(() => {
        const { id } = router.query
        setData({...Data, ready: false})
        if (id !== undefined) {
            axios.get(`/api/movie/${id}?language=${AppState.language}&type=movie`).then(res => {
                res.data.info.director = res.data.credits.crew.filter(person => person.job === "Director")
                res.data.details.id = id
                res.data.credits.cast = res.data.credits.cast.map(person => {
                    person.posterPath = person.profile_path
                    person.title = person.name
                    return person
                })
                setData({ ...res.data, ready: true })
            }).catch(err => {
                    router.push('/404')
                })
        }
    }, [router])

    return (
        <>
            {Data.ready ?
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                    <MovieHeader {...Data.details} />
                    <InfoGrid container sx={{}}>
                        <MovieInfo {...Data.info} poster={Data.media.poster} />
                        <StreamingProviders providers={Data.providers} />
                    </InfoGrid>
                    <MovieMedia images={Data.media.images} videos={Data.media.videos} />
                    <Carousel data={Data.credits.cast} title='cast' type='people' />
                    <SimilarFilms movies={Data.similarMovies} />
                </Box>
                :
                <LoadingAnimation canter />
            }
        </>
    )

}

export default Movie