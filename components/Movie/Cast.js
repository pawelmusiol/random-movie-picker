import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Button, styled, Collapse} from '@mui/material'

const CastImg = styled('img')({
    width: '100%',
    alignSelf: 'center'
})


const Cast = ({cast}) => {
    const [Open, setOpen] = useState(false)
    const [CastSplited, setCastSplited] = useState({main: [], more: []})

    useEffect(() => {
        let main = []
        let more = []
        cast.forEach((person, i) => {
            if (i<6) {
                main.push(person)
            }
            else {
                more.push(person)
            }
            setCastSplited({main: main, more: more})
        })
    },[cast])

    const togleMore = () => {
        setOpen(!Open)
    }

    return (
        <Box>
            <Typography>Cast</Typography>
            <Grid container spacing={8}>
            {CastSplited.main.map(person => 
                <Grid item xs={2} sx={{display: 'flex', flexDirection: 'column',}}>
                    <CastImg src={"https://image.tmdb.org/t/p/w500"+ person.profile_path} />
                    <Typography>{person.character}</Typography>
                    <Typography>{person.name}</Typography>
                </Grid>
            )}
            </Grid>
            <Collapse in={Open} timeout="auto" unmountOnExit>
                <Grid container spacing={8}>
                {CastSplited.more.map(person => 
                    <Grid item xs={2} sx={{display: 'flex', flexDirection: 'column',}}>
                        <CastImg src={"https://image.tmdb.org/t/p/w500"+ person.profile_path} />
                        <Typography>{person.character}</Typography>
                        <Typography>{person.name}</Typography>
                    </Grid>
                )}
                </Grid>
            </Collapse>
            <Button onClick={togleMore}>{Open ? 'Show Less': 'Show More'}</Button>
        </Box>
    )
}

export default Cast