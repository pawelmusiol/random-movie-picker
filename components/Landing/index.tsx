import { Container, Box, Grid, styled, Typography, Button } from '@mui/material'
import { LandingImg } from '../../images'
import Arrows from './arrows'

const LandingContainer = styled(Container)(({ theme }) => ({
    minWidth: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    backgroundImage: `url(${LandingImg.src})`,
    backgroundPosition: '0% -10%',
    //backgroundPosition:'center',
    backgroundSize: 'cover',
    position: 'relative',
    //backgroundColor: '#444',
    '::after': {
        content: "''",
        zIndex: '0',
        position: 'absolute',
        width: '100vw',
        bottom: '0vh',
        height: '10vh',
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(17, 17, 17, 1) 100%)',
    },
    '::before': {
        content: "''",
        position: 'absolute',
        width: '100vw',
        height: '20vh',
        background: '#010101',
    }
}))

const MainBox = styled(Grid)(({ theme }) => ({
    paddingTop: '20vh',
    paddingBottom: '10vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    /*flexDirection: 'row',*/
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#eee',
    zIndex: 4,
    backdropFilter: ' brightness(50%)',
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

/* const Circle = styled(Box, {
    shouldForwardProp: prop => prop !== 'pos' && prop !== 'size'
})<{ pos: {left: string}, size: number }>(({ theme, pos, size }) => ({
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
 */
const Landing = () => {
    return (
        <LandingContainer maxWidth='xl' disableGutters={true} >
            {/* <Circle pos={{top: 100, left: 100}} size={100} />
                <Circle pos={{top: 100, left: 100}} size={150} /> */}
            <MainBox>
                <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography sx={{ /* whiteSpace: 'nowrap', */ fontWeight: 800, fontSize: '3rem' }}>Random Movie Picker</Typography>
                    <Typography sx={{ fontSize: '2rem', marginBottom: 10 }}>The final solution for movie nights</Typography>
                    {/* <Typography sx={{ fontSize: '1.4rem' }}>Search in thousands of movies and tv shows and get we will choose best movie for you. Like Meeseeks we will do our job always to the end. </Typography> */}
                </Box>
                <Arrows />
            </MainBox>
        </LandingContainer>
    )
}

export default Landing