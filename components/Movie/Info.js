import { useMemo } from 'react'
import { Box, Grid, Typography, Paper, styled } from '@mui/material'
import { useRouter } from 'next/router'
import MovieInfo from './MovieInfo'
import TvInfo from './TvInfo'

const Poster = styled('img')({
    maxWidth: '200px',
    marginRight: 10,
})

const Overwiev = styled(Typography)({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '3', /* limit to 2 lines */
})

const GenresList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    marginBottom: 5,
    /* [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    } */
}))

const Info = ({ overview, budget, genres, revenue, poster, firstEpisode, lastEpisode, inProduction }) => {

    const router = useRouter()

    /* const shortOverview = useMemo(() => {
        let short = overview.split('.')[0] + '.'
        if (short.split(' ').length > 20) {
            short = short.split(' ').map((word, i) => {
                if (i < 20) return ' ' + word
            })
        }
        return short
    }, [overview]) */

    console.log(poster)

    return (
        <Grid container spacing={2} xs={9} direction='row'>
            <Grid item md={6} sx={{ display: 'flex' }}>
                {poster &&
                    <Poster src={"https://image.tmdb.org/t/p/w500" + poster.file_path} />
                }
                <Overwiev >{overview}...</Overwiev>
            </Grid>
            <Grid item md={6}>
                {router.pathname.includes('/movie') && <MovieInfo budget={budget} revenue={revenue} />}
                {router.pathname.includes('/tv') && <TvInfo firstEpisode={firstEpisode} lastEpisode={lastEpisode} inProduction={inProduction} />}
                <GenresList>
                    {genres.map((genre, i) => <Paper key={'genre-' + i} sx={{ padding: 1 }}>
                        <Typography>{genre.name}</Typography>
                    </Paper>)}
                </GenresList>
            </Grid>

        </Grid>
    )
}

export default Info