import { TextField, Button, Select, MenuItem, Box, InputLabel, FormControl } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAppContext } from "../context"
import accents from 'remove-accents'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router"


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

const useSearch = (Name, Type, Genre, Language, onSearch,) => {

    const router = useRouter()
    const [Error, setError] = useState({ name: false, type: false })
    const userProviders = useSelector(state => state.User.providers)

    const getProviders = (movies) => {
        //console.log(userProviders)
        movies.map(movie => {
            if (movie.providers !== null && userProviders) {
                //console.log(movie.providers)
                movie.providers.forEach((provider) => {
                    let index = userProviders.findIndex(up => up === provider.provider_id)
                    if (index !== -1) movie.providerAvailable = true
                })
            }
        })
        return movies
    }

    const validateInputs = () => {
        let errors = { name: false, type: false }
        if (Name === '' || typeof Name === 'undefined') {
            errors = { ...errors, name: true }
        }
        if (Type === '' || typeof Type === 'undefined') {
            errors = { ...errors, type: true }
        }
        setError(errors)
        if (errors.name || errors.type) return false
        return true
    }

    const onClick = (Type) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, name: Name, type: Type }
        })
        if (validateInputs()) {
            let uri = accents.remove(`/api/search?query=${Name}&type=${Type ? Type : 'multi'}&genre=${Genre}&page=1&language=${Language}`)
            axios.get(uri).then((res) => {
                res.data.results = getProviders(res.data.results)
                onSearch({ ...res.data, type: Type })
            }).catch((err) => console.log(err))
        }
        else {
            onSearch({ Results: {} })
        }
    }
    return [onClick, Error]
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

const FilmSearch = ({ onSearch }) => {
    const router = useRouter()
    const [AppContext, setAppContext] = useAppContext()
    const [Type, setType] = useState("movie")

    const [FilmName, setFilmName] = useState(router.query.name)
    

    const GenresList = useGenres(AppContext.language, Type)
    const [Genre, setGenre] = useState("")
    const [Search, Error] = useSearch(FilmName, Type, Genre, AppContext.language, onSearch)

    useEffect(() => {
        Search(Type)
    }, [FilmName, Type])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField error={Error.name} value={FilmName} onChange={(e) => { setFilmName(e.target.value) }} label="Name" />
            <FormControl error={Error.type} fullWidth>
                <InputLabel id="search-form-type">Type</InputLabel>
                <Select value={Type} onChange={e => { onSearch({ Results: {} }); setType(e.target.value) }} label="type" labelId="search-form-type">
                    {Types.map((type, index) => <MenuItem value={type.value} key={index}>{type.text}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="search-form-genre">Genre</InputLabel>
                <Select value={Genre} onChange={e => { setGenre(e.target.value) }} label="genre" labelId="search-form-genre">
                    <MenuItem value={0}>All</MenuItem>
                    {GenresList.map((genre, index) => <MenuItem value={genre.id} key={index}>{genre.name}</MenuItem>)}
                </Select>
            </FormControl>
            {/* <Button onClick={() => onClick(Type)}>Szukaj</Button> */}
        </Box>
    )
}

export default FilmSearch