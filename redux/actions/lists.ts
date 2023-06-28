export const setLists = (lists) => {
    return {
        type: 'SET_LISTS',
        lists
    }
}

export const udpateList = (list) => {
    return {
        type: 'UDPATE_LIST',
        list
    }
}

export const clearLists = () => {
    return {
        type: 'CLEAR_LISTS',
    }
}