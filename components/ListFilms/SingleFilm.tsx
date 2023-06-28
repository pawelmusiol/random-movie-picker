import {
    Card,
    CardHeader,
    CardMedia,
    Box,
    Switch,
    styled,
    IconButton,
    Radio,
    RadioGroup,
    Grid,
    Typography,
    useTheme,
    useMediaQuery,
    SxProps
} from "@mui/material"
import { useRef, useState, useEffect, MutableRefObject } from "react"
import { Delete } from '../../icons'
import { NoImage } from "../../images"
import { useDispatch } from 'react-redux'
import axios from "axios"
import { green, red, yellow } from "@mui/material/colors"
import { useRouter } from "next/router"

const DeleteImage = styled('img')(({ theme, color }) => ({
    backgroundColor: color ? color : 'none',
    borderRadius: 4,
    maxWidth: 32,
}))

const SCardHeader = styled(CardHeader)(({ theme }) => ({

    '& > div': {
        display: 'flex',
        flexDirection: 'column'
    },

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        '& > div': {
            flexDirection: 'row-reverse'
        }
    }
}))

interface IProps {
    film: expandedListFilm,
    width?: number,
    selectFilm?: (film: expandedListFilm) => void,
    changePriority?: (film: expandedListFilm) => void,
    deleteFilm?: (id: string) => void,
    deselectFilm?: (film: expandedListFilm) => void,
    sx?: SxProps,
    inputRef?: any, // MutableRefObject<any[]>,
    noAction?: boolean,
    noClick?: boolean
}

const SingleFilm = ({ film, width, selectFilm, changePriority, deleteFilm, deselectFilm, sx, inputRef, noAction = false, noClick = false }: IProps) => {
    const theme = useTheme()
    const router = useRouter()
    const [Priority, setPriority] = useState(1)
    const mobile = useMediaQuery(theme.breakpoints.down('md'))

    const changeFilmState = (e) => {
        film.priority = Priority
        if (e.target.checked) selectFilm(film)
        else deselectFilm(film)
    }

    const onPriorityChange = (e) => {
        setPriority(e.target.value)
        film.priority = parseInt(e.target.value)
        changePriority(film)
    }

    return (
        <>
            {film ?
                <Grid item xs={6} md={3} sx={{
                    ...sx,
                    '& > div': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        minHeight: '100%'
                    }
                }}>
                    <Card id={film._id} /* sx={{ ...sx, width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} */ >
                        <Box>
                            <SCardHeader
                                title={film.name}
                                titleTypographyProps={{ sx: { fontSize: mobile ? 16 : 20 } }}
                                action={!noAction &&
                                    <>
                                        <IconButton>
                                            <DeleteImage src={Delete.src} onClick={() => {
                                                deleteFilm(film._id)
                                            }
                                            } />
                                        </IconButton>
                                        {selectFilm && <Switch id={film.tmdbId.toString()} inputRef={inputRef} onChange={changeFilmState} />}
                                    </>
                                }
                            />
                            {selectFilm && <PriorityGroup Priority={Priority} setPriority={onPriorityChange} />}
                            {(!noAction && film.addedBy) && <Typography>Added By {film.addedBy.name}</Typography>}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'streach',
                                overflow: 'hidden',
                                height: '100%',
                                width: '100%',
                                flexGrow: 4,
                            }}
                        >
                            <CardMedia
                                onClick={() => !noClick ? router.push(`/${film.type}/${film.tmdbId}`) : {}}
                                className='slide'
                                component='img'
                                image={film.posterPath ? `https://image.tmdb.org/t/p/w500/${film.posterPath}` : NoImage.src}
                                alt={`${film.name} image`}

                                sx={{
                                    flexShrink: 0,
                                    minHeight: '100%',
                                    maxHeight: '100%',
                                    minWidth: '100%',
                                    maxWidth: '100%',
                                    objectFit: film.posterPath ? 'cover' : 'contain',
                                    width: 'unset',
                                }}
                            />
                        </Box>
                    </Card >
                </Grid>
                : <p>wait</p>
            }
        </>
    )

}

const PriorityGroup = ({ Priority, setPriority }) => {
    return (
        <RadioGroup
            value={Priority}
            onChange={setPriority}
            sx={{ flexDirection: 'row' }}>
            <Radio value={1} sx={{ color: green[500] }} />
            <Radio value={2} sx={{ color: yellow[500] }} />
            <Radio value={3} sx={{ color: red[500] }} />
        </RadioGroup>

    )
}

export default SingleFilm