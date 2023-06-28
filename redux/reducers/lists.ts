const user = {
    name: '',
    _id: '',

}

const initialValues = [{
    _id: '',
    name: '',
    private: false,
    users: [{
        ...user,
        isAdmin: false,
        isOwner: false
    }],
    
    requests: {
        ...user,
        status: ''
    },
    films: [{
        _id: '',
        id: 0,
        name: '',
        type: '',
        addedBy: user
    }]

}]


export interface IList {
    _id: string,
    films: listFilm[],
    name: string,
    private: boolean,
    queue: listFilmBase[],
    requests: requestUser,
    users: listUser[],
}
type ILists = IList[]

interface ISetLists {
    type: 'SET_LISTS'
    lists: ILists
}

interface IUpdateList {
    type: 'UPDATE_LIST'
    list: IList
}

interface IClearList {
    type: 'CLEAR_LISTS'
}

type action = ISetLists | IUpdateList | IClearList

const Lists = (state = initialValues, action: action) => {
    switch (action.type) {
        case 'SET_LISTS':
            return action.lists
        case 'UPDATE_LIST':
            let temp = [...state]
            let listIndex = temp.findIndex(list => list._id === action.list._id)
            temp[listIndex] = action.list

            return [...temp]
        case 'CLEAR_LISTS':
            return state
        default:
            return state
    }
}

export default Lists