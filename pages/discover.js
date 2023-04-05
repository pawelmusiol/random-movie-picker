import { DiscoverSearchForm, SearchResults, ResultPagination, LoadingAnimation } from '../components'
import { Box } from '@mui/material';
import { useState, useEffect } from 'react'
import { modifyUrl } from './search'
import axios from 'axios';



export default function Home() {

  const [Results, setResults] = useState({ loading: false })
  const [Page, setPage] = useState(1)



  useEffect(() => {
    if (Results.url) {
      setResults({...Results, loading: true})
      let modifiedUrl = modifyUrl(Results.url, Page)

      axios.get(modifiedUrl).then(result => {
        console.log(result);
        setResults({ ...result.data, type: Results.type, loading: false });
      })
    }
  }, [Page])

  return (
    <Box sx={{display: 'flex', flexDirection:'column'}}>
      <DiscoverSearchForm setResults={setResults} />
      {!Results.loading ?
        <>
          <SearchResults results={Results.results} type={Results.type} />
          <ResultPagination page={Page} totalPages={Results.totalPages} changePage={(e, value) => setPage(value)} />
        </>
        : <LoadingAnimation />
      }
    </Box>
  )
}