import { TextField, Button, Select, MenuItem, Box, InputLabel, FormControl } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAppContext } from "../context"
import accents from 'remove-accents'

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


    const [Error, setError] = useState({ name: false, type: false })

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
        if (validateInputs()) {

            let uri = accents.remove(`/api/search?query=${Name}&type=${Type ? Type : 'multi'}&genre=${Genre}&page=1&language=${Language}`)
            console.log(uri)
            axios.get(uri).then((res) => {
                onSearch({ ...res.data, type: Type })
            }).catch((err) => console.log(err))
        }
    }
    return [onClick, Error]
}
const useGenres = (Language) => {
    const [GenresList, setGenresList] = useState([])
    useEffect(() => {
        axios.get(`/api/getGenres?language=${Language}`).then((res) => {
            setGenresList(res.data.genres)
        })
    }, [])
    return GenresList
}

const FilmSearch = ({ onSearch }) => {
    const [AppContext, setAppContext] = useAppContext()
    const [Type, setType] = useState("")

    const [FilmName, setFilmName] = useState("")
    const GenresList = useGenres(AppContext.language)
    const [Genre, setGenre] = useState("")
    const [onClick, Error] = useSearch(FilmName, Type, Genre, AppContext.language, onSearch)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField error={Error.name} value={FilmName} onChange={(e) => setFilmName(e.target.value)} label="Name" />
            <FormControl error={Error.type} fullWidth>
                <InputLabel id="search-form-type">Type</InputLabel>
                <Select value={Type} onChange={e => setType(e.target.value)} label="type" labelId="search-form-type">
                    {Types.map((type, index) => <MenuItem value={type.value} key={index}>{type.text}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="search-form-genre">Genre</InputLabel>
                <Select value={Genre} onChange={e => setGenre(e.target.value)} label="genre" labelId="search-form-genre">
                    <MenuItem value={0}>All</MenuItem>
                    {GenresList.map((genre, index) => <MenuItem value={genre.id} key={index}>{genre.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Button onClick={() => onClick(Type)}>Szukaj</Button>
        </Box>
    )
}

export default FilmSearch