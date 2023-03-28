import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppContext } from '../../context'
import { StreamingProviders, MovieHeader, MovieMedia, Cast, MovieInfo, SimilarFilms, Carousel } from '../../components'
import { Typography, Grid, Box } from '@mui/material'

const Movie = () => {

    const router = useRouter()
    const [Data, setData] = useState(null)
    const [AppState] = useAppContext()

    useEffect(() => {
        const { id } = router.query
        if (id !== undefined) {
            axios.get(`/api/movie/${id}?language=${AppState.language}&type=tv`).then(res => {
                res.data.info.director = res.data.credits.crew.filter(person => person.job === "Director")
                res.data.details.id = id
                res.data.credits.cast = res.data.credits.cast.map(person => {
                    person.posterPath = person.profile_path
                    person.title = person.name
                    return person
                })
                setData(res.data)

            }).catch(err => {
                router.push('/404')
            })
        }
    }, [router])

    return (
        <>
            {Data ?
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, /* overflowX: 'hidden' */ }}>
                    <MovieHeader {...Data.details} />
                    <Grid container direction='row' sx={{ justifyContent: 'space-between' }}>
                        <MovieInfo {...Data.info} poster={Data.media.poster} />
                        <StreamingProviders providers={Data.providers} />
                    </Grid>
                    <MovieMedia images={Data.media.images} videos={Data.media.videos} />
                    {/* <Cast cast={Data.credits.cast} /> */}
                    <Carousel data={Data.credits.cast} title='cast' type='people' />
                    <SimilarFilms movies={Data.similarMovies} />
                </Box>
                :
                <Typography>Loading</Typography>
            }
        </>
    )

}

export default Movie