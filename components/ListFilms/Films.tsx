import { useState, useEffect, MutableRefObject } from 'react'
import { useAppContext } from '../../context'
import { Grid, Typography, } from "@mui/material"
import { SingleFilm } from ".."
import { NoImage } from '../../images'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'

interface IProps {
    listId: string,
    films: listFilm[],
    actions: {
        selectFilm: (film: expandedListFilm) => void,
        deselectFilm: (film: expandedListFilm) => void,
        changePriority: (film: expandedListFilm) => void,
        deleteFilm: (id: string) => void,
    },
    refs: MutableRefObject<any[]>
}

const Films = ({ listId, films, actions, refs }: IProps) => {
    const { context, setContext } = useAppContext()
    const [FilmsData, setFilmsData] = useState<expandedListFilm[] | []>([])
    const user = useAppSelector(state => state.User)

    useEffect(() => {
        axios.get(`/api/list/${listId}/film?language=${context.language}&token=${user.token}`).then(res => {
            setFilmsData(res.data)
        })
    }, [films])



    return (
        <Grid container spacing={2} justifyContent='center'>
            {FilmsData.length ?
                FilmsData.map((film, i) => <SingleFilm inputRef={el => refs.current[i] = el} {...actions} key={film._id} width={250} film={film} />)
                : <Typography>Add Some Films!!!</Typography>
            }
        </Grid>
    )
}

export default Films