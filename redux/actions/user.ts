export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}
export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }
}

export const setProviders = (providers) => {
    return {
        type: 'SET_PROVIDERS',
        providers
    }
}

export const setFavourites = (favourite) => {
    return {
        type: "SET_FAVOURITES",
        favourite,
    }
}