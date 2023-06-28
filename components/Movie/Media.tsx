import { Grid, Box, styled } from "@mui/material"

const MovieImage = styled('img', {
    shouldForwardProp: prop => prop !== 'aspect'
})<{ aspect?: string }>(({ aspect }) => ({
    width: '100%',
    height: '100%',
    border: '4px solid',
}))

interface IImageBoxProps {
    src: string
}

const ImageBox = ({ src }: IImageBoxProps) => (
    <Grid item xs={6} sx={{ overflow: 'hidden' }} >
        <MovieImage src={src} />
    </Grid>
)

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black',
    overflow: 'visible',
    position: 'relative',
    padding: '20px 0 20px 0',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    }
    /* ':before': {
        content: '""',
        backgroundColor: 'black',
        width: 'calc((100vw - 100%) / 2)',
        height: '100%',
        position: 'absolute',
        right: '100%',
        top: 0,
    },
    ':after': {
        content: '""',
        backgroundColor: 'black',
        width: 'calc((100vw - 100%) / 2)',
        height: '100%',
        position: 'absolute',
        left: '100%',
        top: 0,
    }, */
}))

const Iframe = styled('iframe')(({ theme }) => ({
    minWidth: '50%',
    maxWidth: '50%',
    aspectRatio: '16 / 9',
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        maxWidth: '100%',
    }
}))

const ImagesBox = styled(Grid)(({ theme }) => ({
    minWidth: '50%',
    maxWidth: '50%',
    aspectRatio: '500/281',
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        maxWidth: '100%',
    }
}))

interface IImageProps {
    images: image[]
}

const Images = ({ images }: IImageProps) => {
    let imagesDom = []
    if (images.length) {
        for (let i = 1; i < images.length; i++) {
            imagesDom.push(<ImageBox src={"https://image.tmdb.org/t/p/w500" + images[images.length - i].file_path} />)
            if (i === 4) break
        }
    }
    if (imagesDom.length === 1) {

    }
    return (
        <ImagesBox container>
            {imagesDom}
        </ImagesBox>
    )
}

interface IProps {
    images?: image[]
    videos?: video[]
}

const Media = ({ videos, images }: IProps) => {
    return (
        <>
            {(videos.length || images.length) ?
                <MainBox>
                    {videos.length &&
                        <Iframe
                            src={`https://www.youtube.com/embed/${videos[0].key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen />
                    }
                    <Images images={images} />
                </MainBox>
                : <></>
            }
        </>
    )
}

export default Media