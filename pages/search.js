import { useState, useEffect, useTransition } from "react";
import { FilmSearch, SearchResults, ResultPagination, LoadingAnimation, NoResults } from "../components";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../context";
import axios from "axios";
import { getProviders } from "../components/FilmSearch";
import { useSelector } from "react-redux";

export const modifyUrl = (url, page) => {

    let firstPartOfUrl = url.split('?')[0]
    const urlParams = new URLSearchParams(url.split('?')[1])
    urlParams.set('page', page)
    return firstPartOfUrl + "?" + urlParams.toString()
}

const Search = () => {
    const [Results, setResults] = useState({})
    const [Page, setPage] = useState(1)
    const [AppState] = useAppContext()
    const userProviders = useSelector(state => state.User.providers)

    useEffect(() => {
        if (Results.url) {
            setResults({...Results, loading: true})
            let modifiedUrl = modifyUrl(Results.url, Page)
            axios.get(modifiedUrl + '&language=' + AppState.language).then(res => {
                res.data.results = getProviders(res.data.results, userProviders)
                setResults({ ...res.data, type: Results.type, loading: false });
            })
        }
    }, [Page])

    const changeLoadingState = (value) => {
        setResults({ ...Results, loading: value })
    }

    const handleSearch = e => {
        setResults(e)
        setPage(e.page)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FilmSearch onSearch={handleSearch} onLoading={changeLoadingState} />
            {!Results.loading ?
                <>
                    {Results.hasOwnProperty('results') ?
                        <>
                            <SearchResults results={Results.results} type={Results.type} />
                            <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
                        </>
                        :
                        <NoResults />
                    }
                </>
                :
                <LoadingAnimation />
            }
        </Box>
    )
}

export default Search;