import { VoteStars, AddMenu, FavouriteButton } from '../'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import useSetLists from '../ListsList/useSetLists'

const Header = ({ id, type, title, originalTitle, releaseYear, runtime, voteAverage, numberOfEpisodes, numberOfSeasons }) => {
    const user = useSelector(state => state.User)
    let lists = useSetLists()
    lists = lists.filter(list => list.name !== '')
        .map(list => { return { name: list.name, _id: list._id } })

    return (
        <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item>
                <Typography sx={{ fontSize: '2.5rem' }}>{title}</Typography>
                <Typography>Original title: {originalTitle}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography>{releaseYear}</Typography>
                    {runtime && <Typography>{Math.floor(runtime / 60)} h {Math.floor(runtime % 60)} min </Typography>}
                    {numberOfEpisodes && <Typography>{numberOfEpisodes} Episodes</Typography>}
                    {numberOfSeasons && <Typography>{numberOfSeasons} Seasons</Typography>}

                </Box>
            </Grid>
            <Grid item alignSelf='flex-end'>
                <Typography>User Rating</Typography>
                <VoteStars rating={voteAverage} />
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <FavouriteButton id={id} type={type} />
                <Typography>Add To List</Typography>
                <AddMenu film={{ id: id, name: title, type: type }} user={user} lists={lists} />
            </Grid>
        </Grid>
    )
}

export default Header