import { useState, useEffect } from 'react'
import { OutlinedInput, FormControl, Box, Select, MenuItem, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppContext } from '../../context';

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

const useProviders = () => {
    const [AppContext] = useAppContext()
    const [Providers, setProviders] = useState([])
    useEffect(()=> {
        axios.get(`/api/user/1/providers?language=${AppContext.language}`).then(res => {
            setProviders(res.data.availableProviders)
        })
    },[])
    return Providers
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

    const [Type, setType] = useState('movie')
    const [Genre, setGenre] = useState(0)
    const [SafeSearch, setSafeSearch] = useState(false)
    const [Years, setYears] = useState({ from: 2020, to: 2023 })
    const [Providers, setProviders] = useState([])
    const YearsArray = useYears()
    const ProvidersArray = useProviders()

    const Genres = useSelector(state => state.Genres)

    const onMultipleChange = (Values, setValue, value) => {
        let index = Values.findIndex(val => val === value)
        if(index === -1) setValue(value)
        else Values.splice(index, 1)
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
                <InputLabel id="search-form-providers">Providers</InputLabel>
                <Select
                    value={Providers}
                    onChange={e => onMultipleChange(Providers,setProviders, e.target.value)}
                    label="Providers"
                    labelId="search-form-providers"
                    multiple
                    input={<OutlinedInput label="Providers"/>}
                >
                    {ProvidersArray.map((provider, i) => <MenuItem key={`from-${i}`} value={provider.id}>{provider.name}</MenuItem>)}
                </Select>
            </FormControl>
            
        </Box>
    )
}

export default SearchForm