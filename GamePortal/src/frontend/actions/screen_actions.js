/*
Use this function to tell all components whether the app is loading or not. Typically, components may want to disable
input or hide output until loading is compete
 */
export function setLoading(loading) {
    return {
        type: 'LOADING',
        loading: loading
    }
}

/*
Use this function to switch between screens in the app
 */
export function switchScreen(screen) {
    return {
        type: 'SWITCH_SCREEN',
        screen: screen
    }
}