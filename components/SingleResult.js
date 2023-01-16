import { Card, Grid, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { AddMenu, VoteStars } from '.'
import Link from 'next/link'


const IMG = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
})


const SingleResult = ({ id, genre, posterPath, providerAvailable, voteAverage, type, title, lists }) => {
    const user = useSelector(state => state.User)
    return (
        <Grid item sx={{ minHeight: '100%' }} xs={3}>

            <Card sx={{ minHeight: '100%', backgroundColor: providerAvailable ? 'green': 'unset', height: '100%' }}>
                <Grid container sx={{flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%'  }}>
                    <Grid item>
                        <Link href={`/${type}/${id}`}>
                            <IMG src={`https://image.tmdb.org/t/p/w500/${posterPath}`} />
                        </Link>
                    </Grid>
                    <Grid item sx={{margin: 1}} direction='column' spacing={2} >
                        <Grid item sx={{ minWidth: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6">{genre}</Typography>
                            <AddMenu film={{ id: id, name: title, type: type }} user={user} lists={lists} />
                        </Grid>
                        <Grid container spacing={2} flexDirection="row" sx={{  marginTop: 1 }}>
                            <Grid item >
                                <Link href={`/${type}/${id}`}>
                                    <Typography variant="h4" sx={{ cursor: "pointer" }}>{title}</Typography>
                                </Link>
                                <VoteStars rating={voteAverage} />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default SingleResult