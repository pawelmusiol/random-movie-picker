import { Grid, Box, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { Carousel } from '../'

const Image = styled('img')({
    width: '100%',
    alignSelf: 'center'
})

const MovieGrid = styled(Grid)({
    position: 'relative',
    ':hover > div': {
        opacity: 1,
    }
})

const TextBox = styled(Box)({
    transition: '.3s',
    opacity: 0,
    top: 8,
    left: 8,
    height: 'calc(100% - 16px)',
    width: 'calc(100% - 8px)',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
})

const SimilarFilms = ({ movies }) => {

    const router = useRouter()

    return (
        <>
            {movies.length ?
                <>
                <Carousel title='Similar Films'
                data={movies} />
                    {/* <Typography>Similar Films</Typography>
                    <Grid container spacing={1}  >
                        {movies.map((movie, i) =>
                            <MovieGrid
                                item
                                xs={2}
                                sx={{ cursor: 'pointer' }}
                                key={`similar-film-${i}`}
                                onClick={() => router.push(`/${movie.mediaType}/${movie.id}`)}
                            >
                                <Image src={"https://image.tmdb.org/t/p/w500" + movie.poster} />
                                <TextBox>
                                    <Typography>{movie.name}</Typography>
                                </TextBox>
                            </MovieGrid>)}
                    </Grid> */}
                </> : <></>
            }
        </>
    )
}

export default SimilarFilms