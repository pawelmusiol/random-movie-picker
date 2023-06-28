import { styled, Box } from '@mui/material'
import { Bush, Cactus } from '../images'

const StyledImage = styled('img')(({ theme }) => ({

}))

const CactusBox = styled(Box)(({ theme }) => ({
    width: '20vw',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
}))

const BushImage = styled('img')(({ theme }) => ({
    width: '5vw',
    animation: 'wandering 5s infinite linear',


    '@keyframes wandering': {
        '0%': {
            transform: 'translate(0, 0vw) rotate(100deg)',
        },
        '10%': {
            transform: 'translate(10vw, 0) rotate(200deg)',
        },
        '20%': {
            transform: 'translate(20vw, 0) rotate(300deg)',
        },
        '30%': {
            transform: 'translate( 30vw, 0) rotate(400deg)',
        },
        '40%': {
            transform: 'translate(40vw, 0) rotate(500deg)',
        },
        '50%': {
            transform: 'translate(50vw, 0) rotate(600deg)',
        },
        '60%': {
            transform: 'translate(60vw, 0) rotate(700deg)',
        },
        '70%': {
            transform: 'translate(70vw, 0) rotate(800deg)',
        },
        '80%': {
            transform: 'translate(80vw, 0) rotate(900deg)',
        },
        '90%': {
            transform: 'translate(90vw, 0) rotate(1000deg)',
        },
        '100%': {
            transform: 'translate(99vw, 0) rotate(1100deg)',
        },
    }
}))

const Wrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '-5vw',
    bottom: '.3vw',
    animation: 'wrapperAnimation 3.8s infinite cubic-bezier(.49,.62,.65,.85)',


    '@keyframes wrapperAnimation': {
        '10%': {
            transform: 'translate(0, -4vw)'
        },
        '20%': {
            transform: 'translate(0, -0.3vw)'
        },
        '30%': {
            transform: 'translate(0, -2vw)'
        },
        '40%': {
            transform: 'translate(0, -0.3vw)'
        },
        '50%': {
            transform: 'translate(0, -3vw)'
        },
        '60%': {
            transform: 'translate(0, -0.3vw)'
        },
        '70%': {
            transform: 'translate(0, -4.5vw)'
        },
        '80%': {
            transform: 'translate(0, -0.3vw)'
        },
        '90%': {
            transform: 'translate(0, -1vw)'
        },

    }

}))

const NoResults = ({ }) => (
    <Box sx={{overflow: 'hidden'}}>
        <CactusBox>
            <StyledImage src={Cactus.src} />
            <StyledImage src={Cactus.src} />
        </CactusBox>
        <Wrapper>
            <BushImage src={Bush.src} />
        </Wrapper>
    </Box>
)

export default NoResults