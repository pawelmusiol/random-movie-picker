import { SingleResult } from '.'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import useSetLists from './ListsList/useSetLists'

const SearchResult = ({ results, type }) => {

    let lists = useSetLists()
    lists = lists.filter(list => list.name !== '')
    .map(list => { return { name: list.name, _id: list._id } })
    
    return (
        <>
            {results &&
                <Grid container spacing={2}>
                {results.map(result => <SingleResult 
                key={result.id} 
                posterPath={result.poster_path} 
                genres={result.genre_ids} 
                title={result.title ? result.title : result.name}
                voteAverage={result.vote_average}
                type={type}
                id={result.id}
                lists={lists.length ? lists : [{name: 'Zaloguj się'}]}
                />)}
                </Grid>
            }

        </>
    )
}

export default SearchResult