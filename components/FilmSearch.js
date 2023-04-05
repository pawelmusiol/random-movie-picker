import { TextField, Button, Select, MenuItem, Box, InputLabel, FormControl, FormControlLabel, Checkbox } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAppContext } from "../context"
import accents from 'remove-accents'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"
import CustomSnackbar from "./CustomSnackbar"


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

export const getProviders = (movies, userProviders) => {
    //console.log(userProviders)
    movies = movies.map(movie => {
        if (movie.providers !== null && userProviders) {
            movie.providers.forEach((provider) => {
                let index = userProviders.findIndex(up => up === provider.provider_id)
                if (index !== -1) movie.providerAvailable = true
            })
        }
        return movie
    })
    return movies
}

const useSearch = (Name, Type, SafeSearch, Genre, Language, onSearch, setSnackbarState, onLoading) => {

    const router = useRouter()
    const [Error, setError] = useState({ name: false, type: false })
    const userProviders = useSelector(state => state.User.providers)


    const validateInputs = () => {
        let errors = { name: false, type: false }
        if (Name === '' || typeof Name === 'undefined') {
            errors = { ...errors, name: true }
        }
        if (Type === '' || typeof Type === 'undefined') {
            errors = { ...errors, type: true }
        }
        if (typeof SafeSearch === 'undefined') {
            SafeSearch = false
        }
        setError(errors)
        if (errors.name || errors.type) return false
        return true
    }

    const onChange = (Type, Genre) => {
        onLoading(true)
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, name: Name, type: Type }
        })
        if (validateInputs()) {
            let uri = accents.remove(`/api/search/movie-tv?query=${Name}&type=${Type ? Type : 'multi'}&include_adult=${!SafeSearch}&genre=${Genre}&page=1&language=${Language}`)

            axios.get(uri).then((res) => {
                res.data.results = getProviders(res.data.results, userProviders)
                onSearch({ ...res.data, type: Type, genre: Genre, loading: false })
                setSnackbarState({ open: false })
            }).catch((err) => {
                onSearch({ loading: false, error: true, message: err.response.data.message })
                setSnackbarState({
                    open: true,
                    message: err.response.data.message,
                    error: true
                })
            })
        }
        else {
            onSearch({ Results: {} })
        }
    }
    return [onChange, Error]
}

export const useGenres = (Language, Type) => {
    const dispatch = useDispatch()
    const [GenresList, setGenresList] = useState([])
    useEffect(() => {
        axios.get(`/api/getGenres?type=${Type}&language=${Language}`).then((res) => {
            dispatch({ type: 'SET_GENRES', genres: res.data.genres })
            setGenresList(res.data.genres)
        })
    }, [Type])
    return GenresList
}

const FilmSearch = ({ onSearch, onLoading }) => {
    const router = useRouter()
    const [AppContext, setAppContext] = useAppContext()
    const [Type, setType] = useState("movie")
    const [SnackbarState, setSnackbarState] = useState({ open: false, message: '', error: false })
    const [FilmName, setFilmName] = useState(router.query.name)
    const [SafeSearch, setSafeSearch] = useState(false)


    //const GenresList = useGenres(AppContext.language, Type)
    const [Genre, setGenre] = useState("")
    const [Search, Error] = useSearch(FilmName, Type, SafeSearch, Genre, AppContext.language, onSearch, setSnackbarState, onLoading)

    useEffect(() => {
        Search(Type, Genre)
    }, [FilmName, Type, SafeSearch, Genre])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField error={Error.name} value={FilmName} onChange={(e) => { setFilmName(e.target.value) }} label="Name" />
            <FormControl error={Error.type} fullWidth>
                <InputLabel id="search-form-type">Type</InputLabel>
                <Select value={Type} onChange={e => { onSearch({ Results: {} }); setType(e.target.value) }} label="type" labelId="search-form-type">
                    {Types.map((type, index) => <MenuItem value={type.value} key={index}>{type.text}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox checked={SafeSearch} onChange={e => setSafeSearch(e.target.checked)} />} label='Safe search' />
            {/* <FormControl fullWidth>
                <InputLabel id="search-form-genre">Genre</InputLabel>
                <Select value={Genre} onChange={e => { setGenre(e.target.value) }} label="genre" labelId="search-form-genre">
                    <MenuItem value={0}>All</MenuItem>
                    {GenresList.map((genre, index) => <MenuItem value={genre.id} key={index}>{genre.name}</MenuItem>)}
                </Select>
            </FormControl> */}
            {/* <Button onClick={() => onClick(Type)}>Szukaj</Button> */}
            <CustomSnackbar snackbarState={SnackbarState} setSnackbarState={setSnackbarState} />
        </Box>
    )
}

export default FilmSearch