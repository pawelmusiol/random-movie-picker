import { Box, Container, Grid, styled, Typography } from "@mui/material"
import { Carousel } from "../"

interface IProps {
    tv: {
        results: personCredit[],
        voteAverage: number,
    },
    movies: {
        results: personCredit[],
        voteAverage: number,
    }
}

const Credits = ({ tv, movies }: IProps) => {

    return (
        <Box>
            <Carousel data={tv.results} voteAverage={tv.voteAverage} type='tv' title='TV Shows' />
            <Carousel data={movies.results} voteAverage={movies.voteAverage} type='movie' title='Movies' />
        </Box>
    )
}

export default Credits