import { SingleResult } from '.'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import useSetLists from './ListsList/useSetLists'

const SearchResult = ({ results, type }) => {

    let genres = useSelector(state => state.Genres)
    let lists = useSetLists()
    lists = lists.filter(list => list.name !== '')
        .map(list => { return { name: list.name, _id: list._id } })
    const getGenre = (result) => {
        if(result.genre_ids.length){
            return genres.find(genre => genre.id === result.genre_ids[0]).name
        }
        return ''
    }
    return (
        <>
            {results &&
                <Grid container spacing={2}>
                    {results.map(result => <SingleResult
                        key={result.id}
                        posterPath={result.poster_path}
                        genre={getGenre(result)}
                        title={result.title ? result.title : result.name}
                        voteAverage={result.vote_average}
                        type={type}
                        id={result.id}
                        providerAvailable={result.providerAvailable}
                        lists={lists.length ? lists : [{ name: 'Log In' }]}
                    />)}
                </Grid>
            }

        </>
    )
}

export default SearchResult