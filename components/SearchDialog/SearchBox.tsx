import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context";
import accents from 'remove-accents'

interface IProps {
    updateResults: (data: any) => void
}

const SearchBox = ({ updateResults }: IProps) => {

    const { context } = useAppContext()

    const onSearch = (text) => {

        updateResults({ ready: false })
        let url = accents.remove(`/api/search/multi?query=${text}&language=${context.language}`)

        axios.get(url).then(res => {
            //to do


            if (res.data.results.length) {
                updateResults({ results: res.data.results, ready: true })
            }
            else updateResults({ ready: true })

        }).catch(err => {
            //to do
        })
    }
    return (
        <Box>
            <TextField sx={{ '& *': { fontSize: '2rem' } }} variant='standard' placeholder="Insert Text" fullWidth onChange={e => onSearch(e.target.value)} />
        </Box>
    )
}

export default SearchBox