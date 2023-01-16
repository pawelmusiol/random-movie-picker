import { Grid } from "@mui/material";
import SingleMovie from './SingleMovie'

const MovieQueue = ({ movies, onDelete }) => {
    return (
        <Grid container gap={2} justifyContent='center'>
            {movies.length &&
                movies.map((film, i) => <SingleMovie /* listId={listId} */ key={film.id} width={250} deleteFilm={() => onDelete(film._id)} film={film} />)
            }
        </Grid>
    )
}

export default MovieQueue