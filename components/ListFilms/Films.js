import { useState, useEffect } from 'react'
import { useAppContext } from '../../context'
import { Grid, Typography, } from "@mui/material"
import { SingleFilm } from ".."
import { NoImage } from '../../images'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Films = ({ listId, films, actions, refs }) => {
    const [AppState, useAppState] = useAppContext()
    const [FilmsData, setFilmsData] = useState([])
    const user = useSelector(state => state.User)

    useEffect(() => {
        axios.get(`/api/list/${listId}/film?language=${AppState.language}&token=${user.token}`).then(res => {
            setFilmsData(res.data)
        })
    }, [films])



    return (
        <Grid container spacing={2} justifyContent='center'>
            {FilmsData.length ?
                FilmsData.map((film, i) => <SingleFilm listId={listId} inputRef={el => refs.current[i] = el} {...actions} key={film._id} id={film._id} width={250} film={film} />)
                : <Typography>Add Some Films!!!</Typography>
            }
        </Grid>
    )
}

export default Films