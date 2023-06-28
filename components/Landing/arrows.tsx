import { Box, keyframes, styled } from '@mui/material'
import { ArrowDown } from '../../icons'
import { Link } from 'react-scroll'

const Arrow = styled('img')(() => ({
    '@keyframes anim': {
        '0%': {
            opacity: 0,

        },
        '50%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0,
        },
    },
    filter: 'invert(83%) sepia(1%) saturate(179%) hue-rotate(315deg) brightness(81%) contrast(98%) drop-shadow(0px 0px 50px #FFD300)',
    width: '3vh',
    animation: 'anim 2s infinite'
}))

const ArrowBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}))

const Arrows = () => {

    return (
        <Link to="information-panel" spy smooth duration={1000} style={{width:'3vh'}}>
            <ArrowBox>
                <Arrow src={ArrowDown.src} alt="arrow" />
                <Arrow src={ArrowDown.src} alt="arrow" sx={{ animationDelay: '.3s' }} />
                <Arrow src={ArrowDown.src} alt="arrow" sx={{ animationDelay: '.6s' }} />
            </ArrowBox>
        </Link>
    )
}

export default Arrows