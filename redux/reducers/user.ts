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

export interface IUser {
    name: string,
    token: string,
    id: string,
    providers: number[],
    favourite: {
        people: number[],
        tv: number[],
        movie: number[]
    }
}

interface ISetUser {
    type: 'SET_USER',
    user: IUser
}

interface IClearUser {
    type : 'CLEAR_USER'
}

interface ISetProviders {
    type: "SET_PROVIDERS",
    providers: [string]
}


type action = ISetUser | ISetProviders | IClearUser

const User = (state = initialValues, action: action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user
        case "CLEAR_USER":
            return initialValues
        case "SET_PROVIDERS":
            return { ...state, providers: action.providers }
        default:
            return state
    }
}

export default User