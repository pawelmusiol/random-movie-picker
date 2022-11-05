import { Box, Card, Grid, CardHeader, CardMedia, IconButton, Button, Dialog, DialogContent, Switch, Typography, Slide } from '@mui/material'
import { Delete } from '../../icons'
import { NoImage } from '../../images'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'


const DeleteImage = styled('img')(({ theme, color }) => ({
    backgroundColor: color ? color : 'none',
    borderRadius: 4,
    maxWidth: 32,
}))

const MoviePicker = ({ listId, films }) => {
    const refs = useRef([])
    const [SelectedFilms, setSelectedFilms] = useState([])
    const [SelectAll, setSelectAll] = useState(false)
    useEffect(() => {
        refs.current = refs.current.slice(0, films.length)
    }, [])

    const selectFilm = (film) => {
        setSelectedFilms([...SelectedFilms, film])
    }
    const deselectFilm = (film) => {
        setSelectedFilms(Films => {
            let x = Films.filter(x => x._id !== film._id)
            return x
        })
    }
    const switchAllFilms = (e) => {
        refs.current.forEach((input, i) => {
            setTimeout(() => {
                input.click()
            }, i * 10)
        })
    }


    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography>Select All Films</Typography><Switch onChange={switchAllFilms} />
                </Box>
                <Picker selectedFilms={SelectedFilms} />
            </Box>
            <Films listId={listId} refs={refs} films={films} actions={{ selectFilm: selectFilm, deselectFilm: deselectFilm }} />
        </Box>
    )
}

const Picker = ({ selectedFilms }) => {

    const [SelectedFilm, setSelectedFilm] = useState({
        left: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } },
        main: { film: {}, sx: { transition: '.5s', transform: 'scale(1)', zIndex: 2 } },
        right: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } }
    })
    const [ButtonDisabled, setButtonDisabled] = useState(true)
    const [Picking, setPicking] = useState(false)
    const [DialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        if (Picking) setButtonDisabled(true)
        else if (!selectedFilms.length) setButtonDisabled(true)
        else setButtonDisabled(false)
    }, [selectedFilms, Picking])

    const getOne = () => {

        setSelectedFilm(Films => {
            return {
                left: { ...Films.left, sx: { ...Films.left.sx, transform: 'scale(.7)' } },
                main: { ...Films.left, sx: { ...Films.main.sx, transform: 'scale(1)' } },
                right: { ...Films.left, sx: { ...Films.right.sx, transform: 'scale(.7)' } }
            }
        })

        for (let i = 0; i < 60; i++) {
            setPicking(true)
            setDialogOpen(true)
            setTimeout(() => {

                if (i === 59) {
                    setPicking(false)
                    setSelectedFilm(Films => {
                        return {
                            left: { sx: { ...Films.left.sx, transform: 'scale(.5)' }, film: selectedFilms[Math.floor(Math.random() * selectedFilms.length)] },
                            main: { sx: { ...Films.main.sx, transform: 'scale(1.2)' }, film: Films.left.film },
                            right: { sx: { ...Films.right.sx, transform: 'scale(.5)' }, film: Films.left.film },
                        }
                    })
                }
                setSelectedFilm(Films => {
                    return {
                        left: { ...Films.left, film: selectedFilms[Math.floor(Math.random() * selectedFilms.length)] },
                        main: { ...Films.main, film: Films.left.film },
                        right: { ...Films.right, film: Films.main.film },
                    }
                })
            }, 100 * Math.pow(1 + i / 10, 2))
        }
    }



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button disabled={ButtonDisabled} variant='contained' onClick={getOne} sx={{ maxWidth: 'fit-content' }}>Get Movie</Button>
            <Dialog
                onClick={e => {
                    if(!['left-film', 'main-film', 'right-film'].includes(e.target.parentNode.id)){
                        setDialogOpen(false)
                    }
                }
                }
                open={DialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        maxHeight: '90vh',
                        minWidth: '90vw',
                        minHeight: '90vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}>
                {SelectedFilm.left.film.name &&
                    <Box sx={{ transition: '.5s', display: 'flex', flexDirection: 'row' }} >
                        <SingleFilm id='left-film' noAction film={SelectedFilm.left.film} width={250} sx={SelectedFilm.left.sx} />
                        <SingleFilm id='main-film' noAction film={SelectedFilm.main.film} width={250} sx={SelectedFilm.main.sx} />
                        <SingleFilm id='right-film' noAction film={SelectedFilm.right.film} width={250} sx={SelectedFilm.right.sx} />
                    </Box>
                }
            </Dialog>
        </Box>
    )
}

const Films = ({ listId, films, actions, refs }) => {
    const [FilmsData, setFilmsData] = useState([{ id: 0, name: '', releaseDate: '', posterPath: NoImage.src }])

    useEffect(() => {
        axios.get(`/api/list/${listId}/film`).then(res => {
            setFilmsData(res.data)
        })
    }, [films])



    return (
        <Grid container gap={2} justifyContent='center'>
            {FilmsData.map((film, i) => <SingleFilm inputRef={el => refs.current[i] = el} {...actions} listId={listId} key={film.id} width={250} film={film} />)}
        </Grid>
    )
}

const SingleFilm = ({ film, width, selectFilm, deselectFilm, sx, inputRef, id = undefined, noAction = false }) => {

    const cardRef = useRef(null)
    const deleteFilm = () => {
        axios.delete(`/api/list/${List._id}/film/${film._id}}`).then(res => {
            console.log(res.data)
            dispatch({ type: 'UPDATE_LIST', list: res.data })
        })
    }

    const changeFilmState = (e) => {
        if (e.target.checked) selectFilm(film)
        else deselectFilm(film)
    }

    return (
        <>
            {film ?
                <Card id={id} ref={cardRef} sx={{ ...sx, width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
                } >
                    <CardHeader sx={{ minHeight: 100, '& div': { pointerEvents: 'none' } }}
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
                    <CardMedia
                        className='slide'
                        component='img'
                        image={`https://image.tmdb.org/t/p/w500/${film.posterPath}`}
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



export default MoviePicker