import { VoteStars, AddMenu, FavouriteButton } from '../'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import useSetLists from '../ListsList/useSetLists'
import { useAppSelector } from '../../redux/hooks'

interface IProps {
    id: number,
    type: string,
    title: string,
    originalTitle: string,
    releaseYear: string,
    runtime?: number
    voteAverage: number,
    numberOfEpisodes?: number,
    numberOfSeasons?: number,
}
const Header = ({ id, type, title, originalTitle, releaseYear, runtime, voteAverage, numberOfEpisodes, numberOfSeasons }: IProps) => {
    const user = useAppSelector(state => state.User)
    let lists = useSetLists()
    let newLists = lists.filter(list => list.name !== '')
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
            <Grid item alignSelf='center'>
                <Typography>User Rating</Typography>
                <VoteStars rating={voteAverage} />
            </Grid>
            <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                <FavouriteButton id={id} type={type} />
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography>Add To List</Typography>
                    <AddMenu film={{ id: id, name: title, type: type }} user={user} lists={newLists} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Header