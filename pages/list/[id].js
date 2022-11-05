import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { ListInfo, MoviePicker } from '../../components'

const SingleList = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const { id } = router.query
    const selectListById = createSelector(
        state => state.Lists,
        Lists => Lists.filter(list => list._id === id)
    )

    const List = useSelector(selectListById)[0]

    console.log(List)
    return (
        <Box>
            {List &&
                <>
                    <ListInfo
                        
                        users={List.users}
                        listInfo={{ _id: List._id, name: List.name }} />
                    <MoviePicker listId={List._id} films={List.films} />
                </>
            }

        </Box>
    )
}

export default SingleList