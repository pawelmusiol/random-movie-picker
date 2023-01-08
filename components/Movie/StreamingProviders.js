import { Box, styled, Typography } from '@mui/material'

const ProviderImage = styled('img')({
    height: 100
})

const ProvidersLine = styled(Box)({
    display: 'flex',
    maxWidth: '100vw'

})

const StreamingProviders = ({providers}) => {
    return (
        <Box>
            {providers ?
            <>
            {providers.buy &&
                <ProvidersLine>
                    <Typography>Buy</Typography>
                    {providers.buy.map(provider => <ProviderImage src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} />)}
                </ProvidersLine>
            }
            {providers.flatrate &&
                <ProvidersLine>
                <Typography>Streaming</Typography>
                    {providers.flatrate.map(provider => <ProviderImage src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} />)}
                </ProvidersLine>
            }
            {providers.rent && 
                <ProvidersLine>
                <Typography>Rent</Typography>
                    {providers.rent.map(provider => <ProviderImage src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} />)}
                </ProvidersLine>
            }
            {providers.free && 
                <ProvidersLine>
                <Typography>Free</Typography>
                    {providers.free.map(provider => <ProviderImage src={"https://image.tmdb.org/t/p/w500/" + provider.logo_path} />)}
                </ProvidersLine>
            }
            </>
            :
            <Typography>No Providers</Typography>
            }
        </Box>
    )
}

export default StreamingProviders