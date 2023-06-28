import { Box, Grid, Select, MenuItem, FormControl, InputLabel, Button, styled } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../context'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const ProvidersGrid = styled(Grid)(({ theme }) => ({
    maxWidth: 200,
    [theme.breakpoints.down('md')]: {
        maxWidth: '100%'
    }
}))

interface IProps {
    id: string,
    providers: number[],
}

interface IData {
    userProviders?: provider[],
    availableProviders?: provider[],
    ready: boolean
}

const ProvidersSubscriptions = ({ id, providers }: IProps) => {
    const [Data, setData] = useState<IData>({ ready: false })
    const [SelectedProvider, setSelectedProvider] = useState('-1')
    const { context } = useAppContext()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.User)


    useEffect(() => {
        if (id) {
            axios.get(`/api/user/${id}/providers?language=${context.language}`).then(res => {
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
        let index = Data.userProviders.findIndex(provider => provider.id === parseInt(SelectedProvider))
        if (index === -1) {
            axios.post(`/api/user/${id}/providers?token=${user.token}`, { provider: SelectedProvider }).then(res => {
                console.log(res.data)
                dispatch({ type: 'SET_PROVIDERS', providers: res.data.providers })
            })
        }
    }

    const handleDelete = (providerId) => {
        axios.delete(`/api/user/${id}/providers/${providerId}?token=${user.token}`).then(res => {
            dispatch({ type: 'SET_PROVIDERS', providers: res.data.providers })
        })
    }

    return (
        <Box >
            {Data.userProviders &&
                <ProvidersGrid container>
                    {Data.userProviders.map((provider, i) =>
                        <Grid item xs={3} md={4} key={`user-provider-${i}`} sx={{ position: 'relative' }}>
                            <Button onClick={() => handleDelete(provider.id)} style={{ position: 'absolute', top: 0, right: 0 }}>x</Button>
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
                    {Data.ready && Data.availableProviders.filter(provider => {
                        return Data.userProviders.findIndex(uProvider => uProvider.id === provider.id) < 0
                    }).map(provider =>
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