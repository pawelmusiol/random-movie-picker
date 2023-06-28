const initialValues = [{
    id: 0,
    name: ''
}]

export interface IGenres {
    id: number,
    name: string
}

interface ISetGenres {
    type: 'SET_GENRES'
    genres: IGenres[]
}

type action = ISetGenres


const Genres = (state = initialValues, action: action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.genres
        default:
            return state
    }
}

export default Genres