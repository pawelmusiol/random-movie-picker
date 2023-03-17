import { Container, Box, Grid, styled, Typography, Button } from '@mui/material'
import { LandingImg } from '../../images'

const LandingContainer = styled(Container)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    //backgroundColor: '#444',
}))

const MainBox = styled(Grid)(({ theme }) => ({
    height: '70vh',
    display: 'flex',
    /*flexDirection: 'row',*/
    justifyContent: 'center',
    alignItems: 'flex-end', 
    position: 'relative',
    padding: '0 80px',
    '& > div': {
        
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
        padding: '0 20px',
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
        <LandingContainer maxWidth='xl' disableGutters={true} >
            {/* <Circle pos={{top: 100, left: 100}} size={100} />
                <Circle pos={{top: 100, left: 100}} size={150} /> */}
            <MainBox>
                <Grid item xs={12} md={8} sx={{  }}>
                    <Typography sx={{ /* whiteSpace: 'nowrap', */ fontWeight: 800, fontSize: '3rem' }}>Random Movie Picker</Typography>
                    <Typography sx={{ fontSize: '2rem', marginBottom: 10 }}>The final solution for movie nights</Typography>
                    <Typography sx={{ fontSize: '1.4rem' }}>Search in thousands of movies and tv shows and get we will choose best movie for you. Like Meeseeks we will do our job always to the end. </Typography>
                    <Button>Try It</Button>
                    <Button>Learn More</Button>
                </Grid>
                <Grid item xs={12} md={4}>
                        <img style={{width: '100%', minWidth: '100%'}} alt='people watching movie' src={LandingImg.src} />
                </Grid>
            </MainBox>
        </LandingContainer>
    )
}

export default Landing