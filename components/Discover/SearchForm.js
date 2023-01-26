import { useState, useEffect } from 'react'
import { Button, FormControl, Box, Select, MenuItem, InputLabel, Checkbox, FormControlLabel, Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppContext } from '../../context';
import { useGenres } from '../FilmSearch';
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
    useEffect(()=> {
        axios.get(`/api/user/1/providers?language=${language}`).then(res => {
            setProvidersArray(res.data.availableProviders)
        })
    },[])
    useEffect(() => {
        if(UserProviders.length && ProvidersArray.length)
        setProviders(UserProviders.map(Up => {
            return ProvidersArray.find(Pa => Pa.id === Up)
        }))
    },[UserProviders, ProvidersArray])

    return [Providers, setProviders, ProvidersArray]
}

const useCast = (language) => {
    const [Text, setText] = useState('')
    const [CastArray, setCastArray] = useState([{id: 0, name: 'd'}])
    const [SelectedCast, setSelectedCast] = useState([])

    useEffect(() => {
        if(Text.length)
        axios.get(`/api/cast?language=${language}&query=${Text}`).then(res => {
            setCastArray([...SelectedCast, ...res.data])
        })

    },[Text])
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
const SearchForm = ({ }) => {
    const [AppContext] = useAppContext()
    const [Type, setType] = useState('movie')
    const [Genre, setGenre] = useState(0)
    const [SafeSearch, setSafeSearch] = useState(false)
    const [Years, setYears] = useState({ from: 2020, to: 2023 })
    const YearsArray = useYears()
    const [Providers, setProviders, ProvidersArray] = useProviders(AppContext.language)
    const [CastArray, SelectedCast, setSelectedCast, setText] = useCast(AppContext.language)

    const Genres = useGenres(AppContext.language, Type)

    console.log(Providers)

    const onSearch = () => {
        console.log({
            Type:Type,
            Genre: Genre,
            SafeSearch: SafeSearch,
            Years: Years,
            Providers: Providers,
            Cast: SelectedCast,
        })
    }

    return (
        <Box sx={{ display:'flex', flexDirection: 'column', gap: 2}}>
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
                <InputLabel id="search-form-genre" >Genre</InputLabel>
                <Select
                    value={Genre}
                    onChange={e => setGenre(e.target.value)}
                    label="genre"
                    labelId="search-form-genre"
                >
                    <MenuItem value={0}>All</MenuItem>
                    {Genres.map((genre, i) => <MenuItem value={genre.id} key={`genre-${i}`}>{genre.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox onChange={e => setSafeSearch(e.target.checked)} />} label='Safe search' />
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
            <Button onClick={onSearch}>Search</Button>
        </Box>
    )
}

export default SearchForm