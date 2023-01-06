import { Box, Card, Grid, CardHeader, CardMedia, IconButton, Button, Dialog, DialogContent, Switch, Typography, Slide, List } from '@mui/material'
import { useAppContext } from '../../context'
import { NoImage } from '../../images'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import SingleMovie from './SingleMovie'




const MoviePicker = ({ listId, films }) => {
    const refs = useRef([])
    const [SelectedFilms, setSelectedFilms] = useState([])
    useEffect(() => {
        refs.current = refs.current.slice(0, films.length)
    }, [])

    const selectFilm = (film) => {
        if (!(SelectedFilms.filter(e => e._id === film._id) > 0)) {
            setSelectedFilms([...SelectedFilms, film])
        }
    }
    const deselectFilm = (film) => {
        setSelectedFilms(Films => {
            let x = Films.filter(x => x._id !== film._id)
            return x
        })
    }
    const changePriority = (film) => {
        setSelectedFilms(Films => {
            let x = Films.map(f => {
                if(film._id === f._id) f.priority = film.priority
                return f
            })
            return x
        })
    }
    const switchAllFilms = (e) => {
        console.log(e.target.checked)
        refs.current.forEach((input, i) => {
            setTimeout(() => {
                if(e.target.checked){
                    if (!input.checked) {
                        input.click()
                    }
                }
                else if(!e.target.checked){
                    if (input.checked) {
                        input.click()
                    }
                }
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
            <Films listId={listId}  refs={refs} films={films} actions={{ selectFilm: selectFilm, deselectFilm: deselectFilm, changePriority: changePriority }} />
        </Box>
    )
}

const Picker = ({ selectedFilms }) => {

    

    const [SelectedFilm, setSelectedFilm] = useState({
        left: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } },
        main: { film: {}, sx: { transition: '.5s', transform: 'scale(1)', zIndex: 2 } },
        right: { film: {}, sx: { transition: '.5s', transform: 'scale(.7)' } }
    })
    const [FilmsToChoose, setFilmsToChoose] = useState([])
    const [ButtonDisabled, setButtonDisabled] = useState(true)
    const [Picking, setPicking] = useState(false)
    const [DialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        let midFilms = selectedFilms.map(film => {
            let retFilm = []
            for (let i = 0; i < film.priority; i++){
                retFilm.push(film)
            }
            return retFilm
        })
        let finalFilms = []
        for (let i = 0; i < midFilms.length; i++){
            finalFilms = [...finalFilms, ...midFilms[i]]
        }
        setFilmsToChoose(finalFilms)

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
                            left: { sx: { ...Films.left.sx, transform: 'scale(.5)' }, film: FilmsToChoose[Math.floor(Math.random() * FilmsToChoose.length)] },
                            main: { sx: { ...Films.main.sx, transform: 'scale(1.2)' }, film: Films.left.film },
                            right: { sx: { ...Films.right.sx, transform: 'scale(.5)' }, film: Films.left.film },
                        }
                    })
                }
                setSelectedFilm(Films => {
                    return {
                        left: { ...Films.left, film: FilmsToChoose[Math.floor(Math.random() * FilmsToChoose.length)] },
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
                    if (!['left-film', 'main-film', 'right-film'].includes(e.target.parentNode.id)) {
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
                        <SingleMovie id='left-film' noAction film={SelectedFilm.left.film} width={250} sx={SelectedFilm.left.sx} />
                        <SingleMovie id='main-film' noAction film={SelectedFilm.main.film} width={250} sx={SelectedFilm.main.sx} />
                        <SingleMovie id='right-film' noAction film={SelectedFilm.right.film} width={250} sx={SelectedFilm.right.sx} />
                    </Box>
                }
            </Dialog>
        </Box>
    )
}

const Films = ({ listId, films, actions, refs }) => {
    const [AppState, useAppState] = useAppContext()
    const [FilmsData, setFilmsData] = useState([{ id: 0, name: '', releaseDate: '', posterPath: NoImage.src }])

    useEffect(() => {
        axios.get(`/api/list/${listId}/film?language=${AppState.language}`).then(res => {
            setFilmsData(res.data)
        })
    }, [films])



    return (
        <Grid container gap={2} justifyContent='center'>
            {FilmsData.map((film, i) => <SingleMovie listId={listId} inputRef={el => refs.current[i] = el} {...actions} key={film.id} width={250} film={film} />)}
        </Grid>
    )
}



export default MoviePicker