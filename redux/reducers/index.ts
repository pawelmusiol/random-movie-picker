import { combineReducers } from "redux";
import User from './user'
import Lists from './lists'
import Genres from './genres'

export default combineReducers({
    User,
    Lists,
    Genres
})