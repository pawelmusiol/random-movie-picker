import { Box, styled, Paper, Typography, Grid } from '@mui/material'

const ProviderImage = styled('img')({
    height: 60,
    borderRadius: '22% 22% 0 0'
})


const SingleProvider = ({ types, src }) => {
    return (
        <Grid item>
            <Paper sx={{ height: 120, width: 60, borderRadius: '12px' }}>
                <ProviderImage src={src} />
                {types.map((type, i) =>
                    <Typography key={`type-${i}`} sx={{ textAlign: 'center' }}>{type}</Typography>
                )}
            </Paper>
        </Grid>
    )
}

const StreamingProviders = ({ providers }) => {
    return (
        <Grid item xs={3}>
            {providers ?
                <Grid container sx={{justifyContent: 'flex-start', gap: 2}}>
                    {providers.map((provider,i) => <SingleProvider key={`provider-${i}`} src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} types={provider.types} />)}
                </Grid>
                :
                <Typography>No Providers</Typography>
            }
        </Grid>
    )
}

export default StreamingProviders