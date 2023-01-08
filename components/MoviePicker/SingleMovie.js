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
    FormLabel
} from "@mui/material"
import { useRef, useState } from "react"
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

const SingleFilm = ({ film, width, selectFilm, changePriority, deselectFilm, sx, inputRef, listId, id = undefined, noAction = false }) => {

    const router = useRouter()
    const cardRef = useRef(null)
    const [Priority, setPriority] = useState(1)
    const dispatch = useDispatch()
    const deleteFilm = () => {
        axios.delete(`/api/list/${listId}/film/${film._id}`).then(res => {
            console.log(res.data)
            dispatch({ type: 'UPDATE_LIST', list: res.data })
        })
    }

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
                <Card id={id} ref={cardRef} sx={{ ...sx, width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
                } >
                    <CardHeader sx={{ minHeight: 100, /* '& div': { pointerEvents: 'none' } */ }}
                        title={film.name}
                        titleTypographyProps={{ sx: { fontSize: 20 } }}
                        action={!noAction &&
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton>
                                    <DeleteImage src={Delete.src} onClick={deleteFilm} />
                                </IconButton>
                                <Switch inputRef={inputRef} onChange={changeFilmState} />

                            </Box>}
                    />
                    <PriorityGroup Priority={Priority} setPriority={onPriorityChange} />
                    <CardMedia
                    onClick={() => router.push(`/movie/${film.tmdbId}`)}
                        className='slide'
                        component='img'
                        image={film.posterPath ? `https://image.tmdb.org/t/p/w500/${film.posterPath}` : NoImage.src}
                        alt={`${film.name} image`}
                        height={width * 3 / 2}
                        width={width}
                    />
                </Card >
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
            <Radio value={1} sx={{ color: green[500] }}   />
            <Radio value={2} sx={{ color: yellow[500] }} />
            <Radio value={3} sx={{ color: red[500] }} />
        </RadioGroup>

    )
}

export default SingleFilm