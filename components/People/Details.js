import { Box, Grid, Typography, styled, Collapse } from "@mui/material"
import { useState } from "react"
import { FavouriteButton } from '../'
import { LeftArrow } from '../../icons'

const Poster = styled('img')({
    maxWidth: '200px',
    marginRight: 10,
})

const MainGrid = styled(Grid)(({ theme }) => ({
    direction: 'row',
    flexWrap: 'nowrap',

    [theme.breakpoints.down("md")]: {
        direction: 'column',
        flexWrap: 'wrap',
        marginBottom: 20,
    }

}))

const Biography = styled(Grid)(({ theme, showMore }) => ({
    paddingLeft: 10,

    '& > img': {
        display: 'none',
    },

    [theme.breakpoints.down("md")]: {
        paddingLeft: 0,
        position: 'relative',
        marginBottom: 64,

        '& > img': {
            display: 'block',
            position: 'absolute',
            zIndex: 2,
            bottom: -32,
            left: 0,
            width: 32,
            transform: !showMore ? 'rotate(270deg)' : 'rotate(90deg)',
            transition: '2s',
        },
    }
}))

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const Details = ({ data }) => {

    let birthday = new Date(data.birthday)
    let deathday = new Date(data.deathday)

    const [MoreBiography, setMoreBiography] = useState(false)


    return (
        <Box>
            <Typography variant="h3">{data.name}</Typography>
            <MainGrid container>
                <Grid item>
                    <Poster src={"https://image.tmdb.org/t/p/w500" + data.profile_path} />
                </Grid>
                <Grid item >
                    <Typography sx={{ inlineSize: 'max-content' }} >known for {data.known_for_department}</Typography>
                    {data.birthday &&
                        <Typography sx={{ inlineSize: 'max-content' }} >
                            Born {birthday.getDate()} {monthNames[birthday.getMonth()]} {birthday.getFullYear()}
                        </Typography>
                    }
                    {data.deathday &&
                        <Typography sx={{ inlineSize: 'max-content' }} >
                            Died {deathday.getDate()} {monthNames[deathday.getMonth()]} {deathday.getFullYear()}
                        </Typography>
                    }
                    <FavouriteButton id={data.id} type='people' />
                </Grid>
                <Biography item showMore={MoreBiography}>
                    <Collapse in={MoreBiography} timeout={2000} collapsedSize='15rem'>
                        <Typography>{data.biography}</Typography>
                    </Collapse>
                    <img src={LeftArrow.src} onClick={() => setMoreBiography(!MoreBiography)} />
                </Biography>
            </MainGrid>
        </Box>
    )
}

export default Details