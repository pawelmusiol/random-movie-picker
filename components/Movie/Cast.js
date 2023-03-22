import { useState, useEffect } from 'react'
import { Grid, Box, Typography, Button, styled, Collapse } from '@mui/material'
import { useRouter } from 'next/router'
import { NoImage } from '../../images'

const CastImg = styled('img')({
    width: '100%',
    alignSelf: 'center'
})

const InnerBox = styled(Box)({
    cursor: 'pointer',
    position: 'relative',
    ':hover': {

        '& > div': {
            //transition: '.3s',
            opacity: 1,
        },
    }
})

const CoverBox = styled(Box)({
    transition: '.3s',
    background: 'linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 100%)',
    opacity: 0,
    position: 'absolute',
    minWidth: '100%',
    minHeight: '50%',
})

const SinglePerson = ({ person, onClick }) => {
    return (
        <Grid
            item
            xs={4}
            md={2}
            sx={{ display: 'flex', flexDirection: 'column' }}>
            <InnerBox onClick={() => onClick(person.id)} >
                <Box sx={{minHeight: '210px', display: 'flex', justifyContent: 'center',}}>
                    <CoverBox />
                    <CastImg src={person.profile_path ? "https://image.tmdb.org/t/p/w500" + person.profile_path : NoImage.src} />
                </Box>
                <Typography>{person.character}</Typography>
                <Typography>{person.name}</Typography>
            </InnerBox>
        </Grid>
    )
}

const Cast = ({ cast }) => {
    const [Open, setOpen] = useState(false)
    const [CastSplited, setCastSplited] = useState({ main: [], more: [] })
    const router = useRouter()

    const redirectToPerson = (id) => {
        router.push(`/people/${id}`)
    }

    useEffect(() => {
        let main = []
        let more = []
        cast.forEach((person, i) => {
            if (i < 6) {
                main.push(person)
            }
            else {
                more.push(person)
            }
            setCastSplited({ main: main, more: more })
        })
    }, [cast])

    const togleMore = () => {
        setOpen(!Open)
    }

    return (
        <Box>
            {cast.length ?
                <>
                    <Typography>Cast</Typography>
                    <Grid container spacing={8} sx={{ justifyContent: 'space-between' }}>
                        {CastSplited.main.map(person =>
                            <SinglePerson onClick={redirectToPerson} person={person} key={person.id} />
                        )}
                    </Grid>
                    <Collapse in={Open} timeout="auto" unmountOnExit>
                        <Grid container spacing={8}>
                            {CastSplited.more.map((person, i) =>
                                <SinglePerson onClick={redirectToPerson} person={person} key={person.id} />
                            )}
                        </Grid>
                    </Collapse>
                    <Button onClick={togleMore}>{Open ? 'Show Less' : 'Show More'}</Button>
                </>
                : <></>
            }
        </Box>
    )
}

export default Cast