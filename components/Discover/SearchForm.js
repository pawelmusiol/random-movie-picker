import { useState, useEffect } from 'react'
import { Button, FormControl, Box, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppContext } from '../../context';
import { useGenres } from '../FilmSearch';
import CustomSnackbar from '../CustomSnackbar';

const Types = [
    {
        value: 'movie',
        text: 'Movies',
    },
    {
        value: 'tv',
        text: 'TV Shows',
    },
]

const useYears = () => {
    const [Years, setYears] = useState([])
    useEffect(() => {
        let year = new Date().getFullYear()
        let years = []
        for (let i = 0; i < 120; i++) {
            years.push(year - i)
        }
        setYears(years)
    }, [])
    return Years
}

const useProviders = (language) => {
    const UserProviders = useSelector(state => state.User.providers)
    const [ProvidersArray, setProvidersArray] = useState([])
    const [Providers, setProviders] = useState([])
    console.log(Providers)
    useEffect(() => {
        axios.get(`/api/user/1/providers?language=${language}`).then(res => {
            setProvidersArray(res.data.availableProviders)
        })
    }, [])
    useEffect(() => {
        if (UserProviders.length && ProvidersArray.length)
            setProviders(UserProviders.map(Up => {
                return ProvidersArray.find(Pa => Pa.id === Up)
            }))
    }, [UserProviders, ProvidersArray])
    console.log(ProvidersArray)
    return [Providers, setProviders, ProvidersArray]
}

const useCast = (language) => {
    const [Text, setText] = useState('')
    const [CastArray, setCastArray] = useState([{ id: 0, name: 'd' }])
    const [SelectedCast, setSelectedCast] = useState([])

    useEffect(() => {
        if (Text.length)
            axios.get(`/api/cast?language=${language}&query=${Text}`).then(res => {
                setCastArray([...SelectedCast, ...res.data])
            })

    }, [Text])
    return [CastArray, SelectedCast, setSelectedCast, setText]
}

/*
gatunek
rok
include adult aka safe search
rok produkcji
obsada
watch providers
*/
const SearchForm = ({ setResults }) => {
    const [AppContext] = useAppContext()
    const [Type, setType] = useState('movie')
    const [Genres, setGenres] = useState([])
    const [SafeSearch, setSafeSearch] = useState(true)
    const [Years, setYears] = useState({ from: 2020, to: 2023 })
    const YearsArray = useYears()
    const [Providers, setProviders, ProvidersArray] = useProviders(AppContext.language)
    const [CastArray, SelectedCast, setSelectedCast, setText] = useCast(AppContext.language)
    const [SnackbarState, setSnackbarState] = useState({open: false, message: '', error: false})

    const GenresArray = useGenres(AppContext.language, Type)


    const onSearch = () => {

        let queryData = [
            `type=${Type}`,
            'with_genres=' + Genres.map(genre => genre.id).join('.'),
            `include_adult=${SafeSearch}`,
            `primary_release_date.gte=${Years.from}-01-01`,
            `primary_release_date.lte=${Years.to}-12-31`,
            `with_watch_providers=` + Providers.map(provider => provider.id).join('.'),
            Type === 'movie' ? `with_cast=` + SelectedCast.map(cast => cast.id).join('.') : '',
            `language=${AppContext.language}`,
            `page=1`
        ]
        console.log(queryData.join('&'))
        axios.get('/api/discover?' + queryData.join('&')).then(res => {
            setResults({ ...res.data, type: Type })
            setSnackbarState({open: false})
        }).catch(err => {
            setResults({})
            setSnackbarState({
                open: true,
                message: err.response.data.message,
                error: true
            })
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
                <InputLabel id="search-form-type" >Type</InputLabel>
                <Select
                    value={Type}
                    onChange={e => setType(e.target.value)}
                    label="type"
                    labelId="search-form-type"
                >
                    {Types.map((type, i) => <MenuItem value={type.value} key={`type-${i}`}>{type.text}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                {/* <InputLabel id="search-form-providers">Providers</InputLabel> */}
                <Autocomplete
                    value={Genres}
                    onChange={(event, newValues) => setGenres(newValues)}
                    multiple
                    options={GenresArray}
                    getOptionLabel={option => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Genres"
                            placeholder="Genres"
                        />
                    )}
                />
            </FormControl>
            <FormControlLabel control={<Checkbox checked={SafeSearch} onChange={e => setSafeSearch(e.target.checked)} />} label='Safe search' />
            <FormControl>
                <InputLabel id="search-form-year-from">Year From</InputLabel>
                <Select
                    value={Years.from}
                    onChange={e => setYears({ ...Years, from: e.target.value })}
                    label="Year From"
                    labelId="search-form-year-from"
                >
                    {YearsArray.map((year, i) => <MenuItem key={`from-${i}`} value={year}>{year}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="search-form-year-to">Year To</InputLabel>
                <Select
                    value={Years.to}
                    onChange={e => setYears({ ...Years, to: e.target.value })}
                    label="Year To"
                    labelId="search-form-year-to"
                >
                    {YearsArray.map((year, i) => <MenuItem key={`from-${i}`} value={year}>{year}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                {/* <InputLabel id="search-form-providers">Providers</InputLabel> */}
                <Autocomplete
                    value={Providers}
                    onChange={(event, newValues) => setProviders(newValues)}
                    //labelId="search-form-providers"
                    multiple
                    options={ProvidersArray}
                    getOptionLabel={option => option.name}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Providers"
                            placeholder="Providers"
                        />
                    )}
                />
            </FormControl>
            {
                Type !== 'tv' &&
                <FormControl>
                    {/* <InputLabel id="search-form-providers">Providers</InputLabel> */}
                    <Autocomplete
                        value={SelectedCast}
                        onChange={(event, newValues) => setSelectedCast(newValues)}
                        //labelId="search-form-providers"
                        multiple
                        options={CastArray}
                        getOptionLabel={option => option.name}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                onChange={e => setText(e.target.value)}
                                {...params}
                                label="Cast"
                                placeholder="Cast"
                            />
                        )}
                    />
                </FormControl>
            }
            <Button onClick={onSearch}>Search</Button>
            <CustomSnackbar snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
        </Box>
    )
}

export default SearchForm