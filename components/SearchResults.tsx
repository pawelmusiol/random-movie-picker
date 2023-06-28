import { SingleResult } from '.'
import { Grid } from '@mui/material'
import useSetLists from './ListsList/useSetLists'
import { useAppSelector } from '../redux/hooks'

interface IProps {
    results: movieResults,
    type: string
}

const SearchResult = ({ results, type }: IProps) => {
    console.log(results)
    let genres = useAppSelector(state => state.Genres)
    let lists = useSetLists()
    let newLists = lists.filter(list => list.name !== '')
        .map(list => { return { name: list.name, _id: list._id } })
    const getGenre = (result) => {
        if (result.genre_ids.length) {
            try {
                return genres.find(genre => genre.id === result.genre_ids[0]).name
            } catch (error) {
                return ''
            }
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
                        lists={newLists}
                    />)}
                </Grid>
            }

        </>
    )
}

export default SearchResult