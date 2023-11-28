import { Box, styled, Paper, Typography, Grid } from '@mui/material'

const ProviderImage = styled('img')({
    height: 60,
    //borderRadius: '22% 22% 0 0'
})

const ProvidersBox = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
    }
}))

const ProvidersGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between',
    }
}))

const SingleProvider = ({ types, src }) => {
    return (
        <Grid item>
            <Paper sx={{ height: 120, width: 60, borderRadius: 0, flexDirection: 'row', }}>
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
        <ProvidersBox item xs={3}>
            {providers ?
                <ProvidersGrid container sx={{ justifyContent: 'flex-start', gap: 2 }}>
                    {providers.map((provider, i) => <SingleProvider key={`provider-${i}`} src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} types={provider.types} />)}
                </ProvidersGrid>
                :
                <Typography>No Providers</Typography>
            }
        </ProvidersBox>
    )
}

export default StreamingProviders