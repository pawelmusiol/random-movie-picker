const initialValues = {
    name: '',
    token: '',
    id: '',
    providers: [],
    favourite: {
        people: [],
        movies: [],
        tv: [],
    }
}

const User = (state = initialValues, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user
        case "CLEAR_USER":
            return initialValues
        case "SET_PROVIDERS":
            return { ...state, providers: action.providers }
        case "SET_FAVOURITES":
            return { ...state, favorites: action.favourites }
        default:
            return state
    }
}

export default User