import { Grid } from "@mui/material";
import { SingleFilm } from '..'

const FilmsQueue = ({ movies, onDelete }) => {
    return (
        <Grid container gap={2} justifyContent='center'>
            {movies.length &&
                movies.map((film, i) => <SingleFilm /* listId={listId} */ key={film.id} width={250} deleteFilm={() => onDelete(film._id)} film={film} />)
            }
        </Grid>
    )
}

export default FilmsQueue