import { useState, useEffect, useMemo } from "react";
import { FilmSearch, SearchResults, ResultPagination } from "../components";
import { Box } from "@mui/material";
import { useAppContext } from "../context";
import axios from "axios";


const Search = () => {
    const [Results, setResults] = useState({})
    const [Page, setPage] = useState(1)
    const [AppState] = useAppContext()

    useEffect(() => {
        if (Results.url) {
            axios.get(Results.url + Page + '&language=' + AppState.language).then(result => {
                console.log(result);
                setResults({ ...result.data, type: Results.type });
            })
        }
    }, [Page])

    const handleSearch = e => {
        setResults(e)
        setPage(e.page)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FilmSearch onSearch={handleSearch} />
            <SearchResults results={Results.results} type={Results.type} />
            <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
        </Box>
    )
}

export default Search;