import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

const useSetLists = (refresh) => {

    let userId = useSelector(state => state.User.id)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userId) {
            axios.get(`/api/list?userid=${userId}`).then(res => {
                dispatch({ type: 'SET_LISTS', lists: res.data.lists })
            })
        }
    }, [userId, refresh])

    return useSelector(state => state.Lists)
}

export default useSetLists