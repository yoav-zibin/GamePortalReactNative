export function setLoading(loading) {
    return {
        type: 'LOADING',
        loading: loading
    }
}

export function switchScreen(screen) {
    return {
        type: 'SWITCH_SCREEN',
        screen: screen
    }
}