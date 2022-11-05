const initialValues = {
    name: '',
    token: '',
    id: ''
}

const User = (state = initialValues, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user
        case "CLEAR_USER":
            return initialValues
        default:
            return state
    }
}

export default User