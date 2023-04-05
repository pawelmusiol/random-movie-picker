import { Box, styled } from "@mui/material";

const MainBox = styled(Box)(({ theme, center }) => ({
    alignSelf: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    margin: '1.5em',
    width: '6em',
    height: '6em',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

}))

const Ball = styled(Box)(({ theme }) => ({
    "@keyframes bounce": {
        "from, to": {
            transform: "translateY(0) scale(1, 1)",
            animationTimingFunction: "ease-in"
        },
        "9%, 29%, 49%, 69%": {
            transform: "translateY(5em) scale(1, 1)",
            animationTimingFunction: "linear"
        },
        "10%": {
            transform: "translateY(5em) scale(1.5, 0.5)",
            animationTimingFunction: "linear"
        },
        "11%, 31%, 51%, 71%, 91%": {
            transform: "translateY(5em) scale(1, 1)",
            animationTimingFunction: "ease-out"
        },
        "20%": {
            transform: "translateY(2.5em) scale(1, 1)",
            animationTimingFunction: "ease-in"
        },
        "30%": {
            transform: "translateY(5em) scale(1.25, 0.75)",
            animationTimingFunction: "linear"
        },
        "40%": {
            transform: "translateY(3.75em) scale(1, 1)",
            animationTimingFunction: "ease-in"
        },
        "50%": {
            transform: "translateY(5em) scale(1.125, 0.875)",
            animationTimingFunction: "linear"
        },
        "60%": {
            transform: "translateY(4.375em) scale(1, 1)",
            animationTimingFunction: "ease-in"
        },
        "70%": {
            transform: "translateY(5em) scale(1.0625, 0.9375)",
            animationTimingFunction: "linear"
        },
        "85%": {
            transform: "translateY(5em) scale(1, 1)",
            animationTimingFunction: "ease-in"
        },
        "90%": {
            transform: "translateY(5em) scale(1.875, 0.125)",
            animationTimingFunction: "ease-in-out"
        }
    },
    borderRadius: '50%',
    width: '1em',
    height: '1em',
    transformOrigin: '50% 100%',
    animation: 'bounce 2s linear infinite',
    background: theme.palette.primary.dark
}))

const LoadingAnimation = ({ center }) => {
    return (
        <MainBox center={center}>
            <Ball sx={{ backgroundColor: '#f42f25' }} />
            <Ball sx={{ backgroundColor: '#f49725', animationDelay: '.1s' }} />
            <Ball sx={{ backgroundColor: '#255ff4', animationDelay: '.2s' }} />
        </MainBox>
    )
}

export default LoadingAnimation