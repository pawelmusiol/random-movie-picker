import { Grid } from "@mui/material";
import { SingleFilm } from '..'

interface IProps {
    movies: expandedListFilm,
    onDelete: (id: string) => void,
}

const FilmsQueue = ({ movies, onDelete }) => {
    return (
        <Grid container spacing={2} justifyContent='center'>
            {movies.length &&
                movies.map((film:expandedListFilm) => <SingleFilm /* listId={listId} */ key={film.id} width={250} deleteFilm={() => onDelete(film._id)} film={film} />)
            }
        </Grid>
    )
}

export default FilmsQueue