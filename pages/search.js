import { useState, useEffect } from "react";
import { FilmSearch, SearchResults, ResultPagination } from "../components";
import { useSelector } from "react-redux";
import axios from "axios";


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

    const handleSearch = e => {
        setResults(e) 
        setPage(e.page)
    }

    return (
        <>
            <FilmSearch onSearch={handleSearch} />
            <SearchResults results={Results.results} type={Results.type} />
            <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
        </>
    )
}

export default Search;