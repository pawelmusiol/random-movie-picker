import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const useSetLists = () => {

    let token = useAppSelector(state => state.User.token)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (token) {
            axios.get(`/api/list?token=${token}`).then(res => {
                dispatch({ type: 'SET_LISTS', lists: res.data.lists })
            })
        }
    }, [token])

    return useAppSelector(state => state.Lists)
}

export default useSetLists