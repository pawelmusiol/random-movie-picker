import { Box, Typography, styled, useTheme, useMediaQuery } from '@mui/material'
import React, { useState, useRef, useEffect } from "react"
import { StarFilled, RightArrow, LeftArrow } from "../icons"
import { useRouter } from "next/router"
import { NoImage } from '../images'
import { BoxProps } from '@mui/material'


const CarouselOuter = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    //margin: '0 20px',

}) as typeof Box

const CarouselInner = styled(Box)({
    display: 'inline-block',
    padding: '0 20px',
    transition: '.3s',
    margin: 'auto',
})
const Arrow = styled('img')({
    transition: '.3s',
    position: 'absolute',
    height: 32,
    top: 'calc(50% - 30px)',
    zIndex: 2,
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '1px solid black',
    boxShadow: ' 0px 0px 0px 1px rgba(0,0,0,1) inset',
    //filter: 'brightness(0) saturate(100%) invert(50%) sepia(52%) saturate(4455%) hue-rotate(187deg) brightness(102%) contrast(91%)',
    ':hover': {
        height: 42,
        top: 'calc(50% - 35px)',
    }
})

const MovieImg = styled('img')({
    width: '100%',
    alignSelf: 'center',
    aspectRatio: '2/3',
    objectFit: 'contain',
    transition: '.3s',
})

const ImageBox = styled(Box)({
    width: '100%',
    overflow: 'hidden',

})

interface IProps {
    data: {
        posterPath?: string,
        voteAverage?: number,
        character?: string,
        title: string,
        id: number

    }[],
    title?: string,
    type?: string,
    voteAverage?: number,
    onItemClick?: () => void,
    noArrows?: boolean
}

const Carousel = ({ data, title, type, voteAverage, onItemClick, noArrows }: IProps) => {
    const router = useRouter()
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('md'))
    const [LeftMargin, setLeftMargin] = useState(0)
    const [BoxWidth, setBoxWidth] = useState(0)
    const MainBoxRef = useRef(null!)
    let interval = mobile ? 2 : 6

    const goToMovie = (movie) => {
        if (movie.mediaType) router.push(`/${movie.mediaType}/${movie.id}`)
        else router.push(`/${type}/${movie.id}`)
        if (onItemClick) onItemClick()
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
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Typography>{title}</Typography>
            {voteAverage &&
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                    <Typography>Average Votes: {Math.floor(voteAverage * 10) / 10}</Typography>
                    <img src={StarFilled.src} style={{ width: 18 }} />
                </Box>
            }
            {!noArrows &&
                <Arrow
                    onClick={() => moveDiv('left')}
                    sx={{
                        left: 0,
                        display: LeftMargin === 0 ? 'none' : 'unset'
                    }}
                    src={LeftArrow.src}
                />
            }
            <CarouselOuter ref={MainBoxRef}>
                <CarouselInner
                    sx={{
                        marginLeft: `calc(-20px + ${BoxWidth / interval}px * ${LeftMargin})`,
                        width: data.length * Math.floor(BoxWidth / interval) + 40 + 'vw'
                    }}
                >
                    {data.map(movie => <SingleMedia onClick={() => goToMovie(movie)} movie={movie} key={movie.id} width={Math.floor(BoxWidth / interval)} />)}
                </CarouselInner>
            </CarouselOuter>
            {!noArrows &&
                <Arrow
                    onClick={() => moveDiv('right')}
                    sx={{
                        right: 0,
                        display: -LeftMargin + 6 < data.length ? 'unset' : 'none',
                    }}
                    src={RightArrow.src}
                />
            }
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
                flex: 1,
                transition: '.5s',
                '&:hover': {
                    boxShadow: '0px 0px 9px 2px rgba(0,0,0,0.7) inset',
                    '& img': {
                        transform: 'scale(1.2)'
                    }
                },

            }}
        >
            <ImageBox>
                <MovieImg src={movie.posterPath ? 'https://image.tmdb.org/t/p/w500' + movie.posterPath : NoImage.src} />
            </ImageBox>
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