const initialValues = [{
    id: '',
    name: ''
}]



const Genres = (state = initialValues, action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.genres
        default:
            return state
    }
}

export default Genres