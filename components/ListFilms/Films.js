import { useState, useEffect } from 'react'
import { useAppContext } from '../../context'
import { Grid } from "@mui/material"
import { SingleFilm } from ".."
import { NoImage } from '../../images'
import axios from 'axios'

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
            {FilmsData.map((film, i) => <SingleFilm listId={listId} inputRef={el => refs.current[i] = el} {...actions} key={film._id} id={film._id} width={250} film={film} />)}
        </Grid>
    )
}

export default Films