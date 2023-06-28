import { Card, Grid, Typography, Box, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { AddMenu, VoteStars } from '.'
import Link from 'next/link'
import { LaptopCheckIcon } from '../icons'
import { NoImage } from '../images'
import { useAppSelector } from '../redux/hooks'

const Checked = styled('img')(({ theme }) => ({
    //cursor: 'pointer',
    float: 'right',
    //backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    height: 32,
}))

type InputProps = {
    hasImage: boolean
}

const IMG = styled('img')<InputProps>(({ hasImage }) => ({
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    minHeight: '100%',
    objectFit: hasImage ? 'cover' : 'contain',
}))


const SingleResult = ({ id, genre, posterPath, providerAvailable, voteAverage, type, title, lists }) => {
    const user = useAppSelector(state => state.User)
    return (
        <Grid item sx={{ minHeight: '100%' }} xs={12} md={3}>

            <Card sx={{ minHeight: '100%', height: '100%' }}>
                <Grid container sx={{ flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'no-wrap', height: '100%' }}>
                    <Grid item sx={{ flexBasis: 400 }}>
                        <Link href={`/${type}/${id}`}>
                            <IMG hasImage={posterPath} src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : NoImage.src} />
                        </Link>
                    </Grid>
                    <Grid item sx={{ margin: 1, flexBasis:160 }} direction='column' spacing={2} >
                        <Grid item sx={{ minWidth: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6">{genre}</Typography>
                            {providerAvailable && <Checked src={LaptopCheckIcon.src} />}
                            <AddMenu film={{ id: id, name: title, type: type }} user={user} lists={lists} />
                        </Grid>
                        <Grid container spacing={2} flexDirection="row" sx={{ marginTop: 1 }}>
                            <Grid item >
                                <Link href={`/${type}/${id}`}>
                                    <Typography variant="h5" sx={{ cursor: "pointer" }}>{title}</Typography>
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