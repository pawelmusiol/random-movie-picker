import { DiscoverSearchForm, SearchResults, ResultPagination } from '../components'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Home() {

  const [Results, setResults] = useState({})
  const [Page, setPage] = useState(1)

  useEffect(() => {
    axios.get(Results.url + Page).then(result => {
        console.log(result);
        setResults({ ...result.data, type: Results.type });
    })
}, [Page])

  return (
    <>
    <DiscoverSearchForm setResults={setResults}/>
    <SearchResults results={Results.results} type={Results.type} />
    <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
    </>
  )
}