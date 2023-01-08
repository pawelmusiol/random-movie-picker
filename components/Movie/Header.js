import { VoteStars } from '../'
import { Box, Grid, Typography } from '@mui/material'


const Header = ({title, originalTitle, releaseYear, runtime, voteAverage}) => {
    return(
        <Grid container sx={{justifyContent: 'space-between'}}>
            <Grid item>
                <Typography sx={{fontSize: '2.5rem'}}>{title}</Typography>
                <Typography>Original title: {originalTitle}</Typography>
                <Box sx={{display: 'flex', gap: 2}}>
                    <Typography>{releaseYear}</Typography>
                    <Typography>{Math.floor(runtime / 60)} h {Math.floor(runtime % 60)} min </Typography>
                </Box>
            </Grid>
            <Grid item alignSelf='flex-end'>
                <Typography>User Rating</Typography>
                <VoteStars rating={voteAverage} />
            </Grid>
        </Grid>
    )
}

export default Header