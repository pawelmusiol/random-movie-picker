import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context";
import accents from 'remove-accents'

const SearchBox = ({setResults}) => {

    const [Context] = useAppContext()

    const onSearch = (text) => {

        let url = accents.remove(`/api/search/multi?query=${text}&language=${Context.language}`)

        axios.get(url).then(res => {
            //to do
            setResults({...res.data.results, ready: true})
        }).catch(err => {
            //to do
        })
    }
    return (
        <Box>
            <Typography>Search For Everything</Typography>
            <TextField variant='standard' onChange={e => onSearch(e.target.value)} />
        </Box>
    )
}

export default SearchBox