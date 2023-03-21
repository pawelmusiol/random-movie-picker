import { useState, useEffect, useRef } from 'react'
import { Box, Switch, Typography, Checkbox, FormControlLabel } from "@mui/material"
import { Picker, Films, FilmsQueue } from '..'
import { useDispatch } from "react-redux"
import { useAppContext } from '../../context'
import axios from 'axios'

const MoviePicker = ({ listId, films }) => {
    console.log(films)
    const dispatch = useDispatch()
    const refs = useRef([])
    const [SelectedFilms, setSelectedFilms] = useState([])
    const [Queue, setQueue] = useState([])
    const [OnlyQueue, setOnlyQueue] = useState(false)
    const [AppState] = useAppContext()
    useEffect(() => {
        refs.current = refs.current.slice(0, films.length)
    }, [films])

    useEffect(() => {
        axios.get(`/api/list/${listId}/film/queue?language=${AppState.language}`).then(res => {
            setQueue(res.data)
        })
    }, [listId])

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
                if (film._id === f._id) f.priority = film.priority
                return f
            })
            return x
        })
    }

    const deleteFilm = (id) => {
        axios.delete(`/api/list/${listId}/film/${id}`).then(res => {
            console.log(res.data)
            dispatch({ type: 'UPDATE_LIST', list: res.data })
        })
    }

    const switchAllFilms = (e) => {
        refs.current.forEach((input, i) => {
            let inQueue = Queue.map(q => {
                if(q._id !== input.id){
                    return q.tmdbId
                }
            })
            console.log(Queue)
            setTimeout(() => {
                if (e.target.checked && OnlyQueue) {
                    console.log(parseInt(input.id))
                    console.log(inQueue[0])
                    console.log(inQueue.includes(parseInt(input.id)))

                    if (input && !input.checked && !inQueue.includes(parseInt(input.id))) {
                        input.click()
                    }
                }
                else if (e.target.checked) {
                    if (input && !input.checked) {
                        input.click()
                    }
                }
                else if (input && !e.target.checked) {
                    if (input.checked) {
                        input.click()
                    }
                }
            }, i * 10)
        })
    }


    const addToQueue = (film) => {
        console.log(film)
        let modifiedFilm = {
            id: film.tmdbId,
            name: film.name,
            type: film.type,
        }
        axios.post(`/api/list/${listId}/film/queue?language=${AppState.language}`, { film: modifiedFilm }).then(res => {
            console.log(res.data)
            setQueue(res.data)
        })
    }
    const RemoveFromQueue = (id) => {
        axios.delete(`/api/list/${listId}/film/queue?filmId=${id}&language=${AppState.language}`).then(res => {
            console.log(res.data)
            setQueue(res.data)
        })
    }

    return (
        <Box>
            <FilmsQueue movies={Queue} onDelete={RemoveFromQueue} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography>Select All Films</Typography><Switch onChange={switchAllFilms} />
                    <FormControlLabel control={<Checkbox checked={OnlyQueue} onChange={() => setOnlyQueue(!OnlyQueue)} />} label="Without Queue" />
                </Box>
                <Picker addToQueue={addToQueue} selectedFilms={SelectedFilms} />
            </Box>
            <Films listId={listId} refs={refs} films={films} actions={{ selectFilm: selectFilm, deselectFilm: deselectFilm, changePriority: changePriority, deleteFilm: deleteFilm, }} />
        </Box>
    )
}

export default MoviePicker