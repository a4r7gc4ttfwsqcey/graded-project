const reducer = (state = null, action) => {
    switch (action.type) {
        case 'clear':
            return state = null
        case 'auth':
            return action.data
        default:
            return state
    }
}
export default reducer