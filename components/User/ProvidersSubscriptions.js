import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Button, styled } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../context'
import { useDispatch, useSelector } from 'react-redux'

const ProvidersGrid = styled(Grid)(({theme}) => ({
    maxWidth: 200,
    [theme.breakpoints.down('md')]:{
        maxWidth: '100%'
    }
}))

const ProvidersSubscriptions = ({ id, providers }) => {
    const [Data, setData] = useState({ ready: false, })
    const [SelectedProvider, setSelectedProvider] = useState(-1)
    const [AppState] = useAppContext()
    const dispatch = useDispatch()
    const user = useSelector(state => state.User)


    useEffect(() => {
        if (id) {
            axios.get(`/api/user/${id}/providers?language=${AppState.language}`).then(res => {
                let providersWithBanner = providers.map(provider => {
                    return res.data.availableProviders.find(ap => ap.id === provider)
                })
                console.log(res.data)
                setData({
                    ...res.data,
                    ready: true,
                    userProviders: providersWithBanner
                })
            })
        }
    }, [id, user])

    const handleSubmit = () => {
        let index = Data.userProviders.findIndex(provider => provider.id === SelectedProvider)
        if (index === -1) {
            axios.post(`/api/user/${id}/providers`, { provider: SelectedProvider }).then(res => {
                console.log(res.data)
                dispatch({ type: 'SET_PROVIDERS', providers: res.data.providers })
            })
        }
    }

    return (
        <Box >
            {Data.userProviders &&
                <ProvidersGrid container>
                    {Data.userProviders.map((provider, i) =>
                        <Grid item xs={3} md={4} key={`user-provider-${i}`}>
                            <img style={{ minWidth: 60, maxWidth: 60 }} src={"https://image.tmdb.org/t/p/w500" + provider.logoPath} />
                        </Grid>
                    )}
                </ProvidersGrid>
            }
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id='provider-select-label'>Providers</InputLabel>
                <Select
                    label='Providers'
                    value={SelectedProvider}
                    onChange={e => setSelectedProvider(e.target.value)}
                >
                    {Data.ready && Data.availableProviders.map(provider =>
                        <MenuItem
                            key={`available-provider-${provider.id}`}
                            value={provider.id}
                        >
                            {provider.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit}>Dodaj</Button>
        </Box>
    )
}

export default ProvidersSubscriptions