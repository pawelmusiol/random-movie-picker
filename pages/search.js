import { useState, useEffect } from "react";
import { FilmSearch, SearchResults, ResultPagination } from "../components";
import axios from "axios";

const useSearch = (page, url, setResults) => {

    


}

const Search = () => {
    const [Results, setResults] = useState({})
    const [Page, setPage] = useState(1)
    console.log(Page)
    useEffect(() => {
        axios.get(Results.url + Page).then(result => {
            console.log(result);
            setResults(result.data);
        })
    }, [Page])

    return (
        <>
            <FilmSearch onSearch={e => { setResults(e); setPage(e.page) }} />
            <SearchResults results={Results.results} type={Results.type} />
            <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
        </>
    )
}

export default Search;