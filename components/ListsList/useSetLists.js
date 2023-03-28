import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

const useSetLists = (refresh) => {

    let token = useSelector(state => state.User.token)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            axios.get(`/api/list?token=${token}`).then(res => {
                dispatch({ type: 'SET_LISTS', lists: res.data.lists })
            })
        }
    }, [token, refresh])

    return useSelector(state => state.Lists)
}

export default useSetLists