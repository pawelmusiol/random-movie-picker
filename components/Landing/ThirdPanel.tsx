import { Box, Button, Container, Grid, styled, Typography } from "@mui/material"
import { ThirdPanel as ThirdPanelBg, TmdbLogo, NetflixLogo, WorldwideImg } from "../../images"
import PromoImage from "./PromoImage"
import { useAppContext } from "../../context"

const MainBox = styled(Box)(({ theme }) => ({
    width: '100vw',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ccc',
    color: 'black',
    ':before': {
        content: "''",
        background: `url(${ThirdPanelBg.src})`,
        backgroundSize: 'cover',
        position: 'absolute',
        width: '50vw',
        height: '50vh',
        //transform: 'rotate(180deg)',
        bottom: '-17.1%',
        right: '-7%',
        [theme.breakpoints.down('md')]: {
            bottom: '-17%',
        }
    }
}))

const InnerContainer = styled(Container)(({ theme }) => ({
    marginTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: '90vh',
}))

const JoinButton = styled(Button)(({ theme }) => ({

}))


const ThirdPanel = () => {
    const { context, setContext } = useAppContext()
    const onJoin = () => setContext({ ...context, loginOpen: true })

    return (
        <MainBox>
            <InnerContainer>
                <Typography variant="h2">WHY RMP?</Typography>
                <Grid container direction='row' spacing={{ xs: 5, md: 10 }}>
                    <PromoImage imgSrc={NetflixLogo.src} title='Accessibility'>Choose what streaming platforms you use and search in your favourite media</PromoImage>
                    <PromoImage imgSrc={TmdbLogo.src} title='Variety'>Powered by TMDB you can choose from thousands of various movies and tv shows</PromoImage>
                    <PromoImage imgSrc={WorldwideImg.src} title='Community'>Our app search movies that trends in your country, so you cab be in touch with your friends</PromoImage>
                </Grid>
                <JoinButton onClick={onJoin}>Join Now</JoinButton>
            </InnerContainer>
        </MainBox>
    )
}

export default ThirdPanel