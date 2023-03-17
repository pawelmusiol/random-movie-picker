import { Box, Grid, Typography, styled, Button } from "@mui/material"
import { FavouriteButton } from '../'

const Poster = styled('img')({
    maxWidth: '200px',
    marginRight: 10,
})

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

    

    return (
        <Box>
            <Typography variant="h3">{data.name}</Typography>
            <Grid container sx={{ direction: 'row', flexWrap: 'nowrap' }}>
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
                <Grid item sx={{ paddingLeft: 10 }}>
                    <Typography>{data.biography}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Details