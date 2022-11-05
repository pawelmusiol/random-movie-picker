const user = {
    name: '',
    id: '',

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
        id: '',
        name: '',
        addedBy: user
    }]

}]



const Lists = (state = initialValues, action) => {
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