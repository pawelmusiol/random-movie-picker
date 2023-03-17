import { Box, Container, Grid, styled, Typography } from "@mui/material"

import { Carousel } from "../"


const Credits = ({ tv, movies }) => {
    console.log(tv)
    console.log(movies)
    return (
        <Box>
            <Carousel data={tv.results} voteAverage={tv.voteAverage} type='tv' title='TV Shows' />
            <Carousel data={movies.results} voteAverage={movies.voteAverage} type='movie' title='Movies' />
        </Box>
    )
}

export default Credits