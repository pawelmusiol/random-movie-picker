import { useState, useEffect, useRef } from 'react'
import { Box, Switch, Typography, Checkbox, FormControlLabel } from "@mui/material"
import { Picker, Films, FilmsQueue } from '..'
import { useDispatch, useSelector } from "react-redux"
import { useAppContext } from '../../context'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks'

interface IProps {
    listId: string,
    films: listFilm[]
}

const MoviePicker = ({ listId, films }: IProps) => {
    const dispatch = useDispatch()
    const refs = useRef([])
    const [SelectedFilms, setSelectedFilms] = useState<expandedListFilm[]>([])
    const [Queue, setQueue] = useState([])
    const [OnlyQueue, setOnlyQueue] = useState(false)
    const { context } = useAppContext()
    const user = useAppSelector(state => state.User)
    useEffect(() => {
        refs.current = refs.current.slice(0, films.length)
    }, [films])

    useEffect(() => {
        axios.get(`/api/list/${listId}/film/queue?language=${context.language}&token=${user.token}`).then(res => {
            setQueue(res.data)
        })
    }, [listId])

    const selectFilm = (film: expandedListFilm) => {
            if (!(SelectedFilms.filter(e => e._id === film._id).length > 0)) {
                setSelectedFilms([...SelectedFilms, film])
            }
    }
    const deselectFilm = (film: expandedListFilm) => {
        setSelectedFilms(Films => {
            let x = Films.filter(x => x._id !== film._id)
            return x
        })
    }
    const changePriority = (film: expandedListFilm) => {
        setSelectedFilms(Films => {
            let x = Films.map((f: expandedListFilm) => {
                if (film._id === f._id) f.priority = film.priority
                return f
            })
            return x
        })
    }

    const deleteFilm = (id: string) => {
        setSelectedFilms(Films => {
            if (Films.length) {
                let x = Films.filter(x => x._id !== id)
                return x
            }
        })
        console.log(SelectedFilms)
        axios.delete(`/api/list/${listId}/film/${id}?token=${user.token}`).then(res => {
            console.log(res.data)
            dispatch({ type: 'UPDATE_LIST', list: res.data })
        })
    }

    const switchAllFilms = (e) => {
        refs.current.forEach((input, i) => {
            console.log(typeof Queue)
            setTimeout(() => {
                if (input) {
                    if (e.target.checked && OnlyQueue) {

                        let inQueue = Queue ? Queue.map(q => {
                            console.log(input)
                            if (input) {
                                if (q._id !== input.id) {
                                    return q.tmdbId
                                }
                            }
                        }) : []

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
        axios.post(`/api/list/${listId}/film/queue?language=${context.language}&token=${user.token}`, { film: modifiedFilm }).then(res => {
            console.log(res.data)
            setQueue(res.data)
        })
    }
    const RemoveFromQueue = (id) => {
        axios.delete(`/api/list/${listId}/film/queue?filmId=${id}&language=${context.language}&token=${user.token}`).then(res => {
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