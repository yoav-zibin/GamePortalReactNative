export function switchTab(newTab) {
    return {
        type: 'SWITCH_GAME_CENTER_TAB',
        newTab: newTab
    }
}

export function setGameSpecs(gameSpecs) {
    return {
        type: 'SET_GAME_SPECS',
        gameSpecs: gameSpecs
    }
}

export function setMatches(matches) {
    return {
        type: 'SET_MATCHES',
        matches: matches
    }
}