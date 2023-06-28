import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppContext } from '../../context'
import { StreamingProviders, MovieHeader, MovieMedia, Cast, MovieInfo, SimilarFilms, Carousel, LoadingAnimation } from '../../components'
import { Typography, Grid, Box } from '@mui/material'


interface IData {
    credits?: credits,
    details?: detailsTV,
    info?: mediaInfo,
    media?: media,
    similarMovies?: similarMovie[],
    ready: boolean
    providers?: provider | null
}

const Movie = () => {

    const router = useRouter()
    const [Data, setData] = useState<IData>({ ready: false })
    const { context } = useAppContext()

    useEffect(() => {
        setData({ ...Data, ready: false })
        const { id } = router.query
        if (id !== undefined) {
            axios.get(`/api/movie/${id}?language=${context.language}&type=tv`).then(res => {
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, /* overflowX: 'hidden' */ }}>
                    <MovieHeader {...Data.details} />
                    <Grid container direction='row' sx={{ justifyContent: 'space-between' }}>
                        <MovieInfo {...Data.info} poster={Data.media.poster} />
                        <StreamingProviders providers={Data.providers} />
                    </Grid>
                    <MovieMedia images={Data.media.images} videos={Data.media.videos} />
                    {/* <Cast cast={Data.credits.cast} /> */}
                    <Carousel data={Data.credits.cast} title='cast' type='people' />
                    <Carousel title="Similar Movies" type="tv" data={Data.similarMovies} />
                    {/* <SimilarFilms movies={Data.similarMovies} /> */}
                </Box>
                :
                <LoadingAnimation center />
            }
        </>
    )

}

export default Movie