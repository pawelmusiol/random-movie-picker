import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { ListInfo, MoviePicker } from '../../components'
import { useAppContext } from '../../context'
import { SimilarFilms } from '../../components'
import useSetLists from '../../components/ListsList/useSetLists'

const SingleList = () => {

    useSetLists()
    const router = useRouter()
    const dispatch = useDispatch()
    const { id } = router.query
    const [SimilarFilmsData, setSimilarFilmsData] = useState({})
    const [AppContext] = useAppContext()

    const selectListById = createSelector(
        state => state.Lists,
        Lists => Lists.filter(list => list._id === id)
    )

    const List = useSelector(selectListById)[0]

    useEffect(() => {
        if (List) {
            let data = {
                films: List.films.map(film => {
                    return {
                        id: film.id,
                        type: film.type,
                    }
                }),
                language: AppContext.language
            }
            axios.post(`/api/list/${id}/film/similar`, data).then(res => {
                setSimilarFilmsData(res.data)
            })
        }

    }, [id, List])


    return (
        <Box>
            {List &&
                <>
                    <ListInfo

                        users={List.users}
                        listInfo={{ _id: List._id, name: List.name }} />
                    <MoviePicker listId={List._id} films={List.films} />
                    <SimilarFilms movies={SimilarFilmsData}  />
                </>
            }

        </Box>
    )
}

export default SingleList