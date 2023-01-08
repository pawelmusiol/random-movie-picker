import { Box, Typography, Paper } from '@mui/material'

const Info = ({ tagline, budget, genres, revenue }) => {
    return(
        <Box>
            <Typography>Info</Typography>
            <Typography>{tagline}</Typography>
            <Typography>Budget: {budget}</Typography>
            <Typography>Boxoffice: {revenue}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 5}}>
                {genres.map(genre => <Paper sx={{ padding:1 }}>
                    <Typography>{genre.name}</Typography>
                </Paper>)}
            </Box>
        </Box>
    )
}

export default Info