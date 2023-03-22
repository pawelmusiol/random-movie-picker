import { Box, Typography, styled, useTheme, useMediaQuery } from '@mui/material'
import { useState, useRef, useEffect } from "react"
import { StarFilled, RightArrow, LeftArrow } from "../icons"
import { useRouter } from "next/router"

const CarouselOuter = styled(Box)({
    display: 'inline-block',
    position: 'relative',
    padding: '0 20px',
    transition: '.3s',
})
const Arrow = styled('img')({
    transition: '.3s',
    position: 'absolute',
    height: 32,
    top: 'calc(50% - 80px)',
    zIndex: 2,
    cursor: 'pointer',
    ':hover': {
        height: 42,
        top: 'calc(50% - 85px)',
    }
})

const MovieImg = styled('img')({
    width: '100%',
    //alignSelf: 'center',
})



const Carousel = ({ data, title, type, voteAverage }) => {
    const router = useRouter()
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('md'))
    const [LeftMargin, setLeftMargin] = useState(0)
    const [BoxWidth, setBoxWidth] = useState(0)
    const MainBoxRef = useRef()
    let interval = mobile ? 2 : 6

    const goToMovie = (movie) => {
        if (movie.mediaType) router.push(`/${movie.mediaType}/${movie.id}`)
        else router.push(`/${type}/${movie.id}`)
    }

    const moveDiv = (direction) => {
        if (direction === 'left' && LeftMargin < 0) {
            setLeftMargin(LeftMargin + interval)
        }
        if (direction === 'right' && -LeftMargin + interval < data.length) {
            setLeftMargin(LeftMargin - interval)
        }
    }
    useEffect(() => {
        if (MainBoxRef.current) {
            setBoxWidth(MainBoxRef.current.offsetWidth)
        }
    }, [MainBoxRef])

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }} ref={MainBoxRef}>
            <Typography>{title}</Typography>
            {voteAverage &&
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Typography>Average Votes: {Math.floor(voteAverage * 10) / 10}</Typography>
                    <img src={StarFilled.src} style={{ width: 18 }} />
                </Box>
            }
            <Arrow
                onClick={() => moveDiv('left')}
                sx={{
                    left: 0,
                    display: LeftMargin === 0 ? 'none' : 'unset'
                }}
                src={LeftArrow.src}
            />
            <CarouselOuter
                sx={{
                    marginLeft: `calc(-20px + ${BoxWidth / interval}px * ${LeftMargin})`,
                    width: data.length * Math.floor(BoxWidth / interval) + 40 + 'vw'
                }}
            >
                {data.map(movie => <SingleMedia onClick={() => goToMovie(movie)} movie={movie} key={movie.id} width={Math.floor(BoxWidth / interval)} />)}
            </CarouselOuter>
            <Arrow
                onClick={() => moveDiv('right')}
                sx={{
                    right: 0,
                    display: -LeftMargin + 6 < data.length ? 'unset' : 'none',
                }}
                src={RightArrow.src}
            />
        </Box>
    )
}

const SingleMedia = ({ movie, width, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                float: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: width,
                padding: 2,
            }}
        >
            <MovieImg src={'https://image.tmdb.org/t/p/w500' + movie.posterPath} />
            <Typography>{movie.character}</Typography>
            <Typography sx={{ color: '#790604' }}>{movie.title}</Typography>
            {movie.voteAverage &&
                <Box style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <img style={{ maxWidth: 24 }} src={StarFilled.src} />
                    <Typography sx={{ fontSize: '1.6rem' }}>{Math.floor(movie.voteAverage * 10) / 10}</Typography>
                </Box>
            }
        </Box>
    )
}

export default Carousel