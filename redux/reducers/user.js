const initialValues = {
    name: '',
    token: '',
    id: '',
    providers: [],
}

const User = (state = initialValues, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user
        case "CLEAR_USER":
            return initialValues
        case "SET_PROVIDERS":
            return {...state, providers: action.providers}
        default:
            return state
    }
}

export default User