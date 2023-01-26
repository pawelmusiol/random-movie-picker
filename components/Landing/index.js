import { Container, Box, styled, Typography, Button } from '@mui/material'
import { LandingImg } from '../../images'
import Image from 'next/image'

const LandingContainer = styled(Container)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    //backgroundColor: '#444',
}))

const MainBox = styled(Box)(({ theme }) => ({
    height: '70vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
    padding: '0 80px',
    '& > div > *':{
        //float: 'right',
        //textAlign: 'right',
    },
    '& button': {
        marginTop: '20px !important',
        backgroundColor: theme.palette.primary.main,
        color: 'black',
        margin: 5,
        '&:hover': {
            backgroundColor: '#777',
        }
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        }
}))

const Circle = styled(Box)(({ theme, pos, size }) => ({
    borderRadius: '50%',
    minWidth: size,
    maxWidth: size,
    minHeight: size,
    maxHeight: size,
    background: theme.palette.primary.main,
    position: 'absolute',
    left: pos.left,
    top: pos.top,
}))

const Landing = () => {
    return (
        <LandingContainer maxWidth={false} disableGutters={true} >
                {/* <Circle pos={{top: 100, left: 100}} size={100} />
                <Circle pos={{top: 100, left: 100}} size={150} /> */}
            <MainBox>
                <Box sx={{ marginLeft: 10, marginTop: 10 }}>
                    <Typography sx={{ whiteSpace: 'nowrap' ,fontWeight: 800, fontSize: '3rem' }}>Random Movie Picker</Typography>
                    <Typography sx={{ fontSize: '2rem', marginBottom: 10 }}>The final solution for movie nights</Typography>
                    <Typography sx={{ fontSize: '1.4rem' }}>Search in thousands of movies and tv shows and get we will choose best movie for you. Like Meeseeks we will do our job always to the end. </Typography>
                <Button>Try It</Button>
                <Button>Learn More</Button>
                </Box>
                <Box>
                    <Box sx={{ width: '60vw', minWidth: '60vw', aspectRatio: '80/43', position: 'relative' }}>
                        <Image layout='fill' alt='people watching movie' src={LandingImg.src} />
                    </Box>
                </Box>
            </MainBox>
        </LandingContainer>
    )
}

export default Landing