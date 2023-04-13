import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context";
import accents from 'remove-accents'

const SearchBox = ({ setResults }) => {

    const [Context] = useAppContext()

    const onSearch = (text) => {

        setResults({ ready: false })
        let url = accents.remove(`/api/search/multi?query=${text}&language=${Context.language}`)

        axios.get(url).then(res => {
            //to do
            let res1 = []
            let res2 = []

            if (res.data.results.length) {
                res.data.results.forEach((singleResult, i) => {
                    if (i < 6) {
                        res1.push(singleResult)
                    }
                    else if (i < 12) {
                        res2.push(singleResult)
                    }
                })
                setResults({ results1: res1, results2: res2, ready: true })
            }
            else setResults({ ready: true })

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