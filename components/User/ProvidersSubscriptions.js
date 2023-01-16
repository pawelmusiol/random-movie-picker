import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../context'
import { useDispatch } from 'react-redux'

const ProvidersSubscriptions = ({ id, providers }) => {
    const [Data, setData] = useState({ ready: false, })
    const [SelectedProvider, setSelectedProvider] = useState(-1)
    const [AppState] = useAppContext()
    const dispatch = useDispatch()



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
    }, [id])

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
        <Box>
            {Data.userProviders &&
                <Grid container>
                    {Data.userProviders.map((provider, i) =>
                        <Grid xs={1} key={`user-provider-${i}`}>
                            <img style={{ maxWidth: 60 }} src={"https://image.tmdb.org/t/p/w500" + provider.logoPath} />
                        </Grid>
                    )}
                </Grid>
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