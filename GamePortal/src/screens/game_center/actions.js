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

export function addRecentlyAddedGame(recentlyAddedGame) {
    return {
        type: 'ADD_RECENTLY_ADDED_GAME',
        recentlyAddedGame: recentlyAddedGame
    }
}

export function resetRecentlyAddedGames() {
    return {
        type: 'RESET_RECENTLY_ADDED_GAMES',
    }
}

export function addPreviouslyPlayedGame(previouslyPlayedGame) {
    return {
        type: 'ADD_PREVIOUSLY_PLAYED_GAME',
        previouslyPlayedGame: previouslyPlayedGame
    }
}

export function resetPreviouslyPlayedGames() {
    return {
        type: 'RESET_PREVIOUSLY_PLAYED_GAMES'
    }
}

export function setSearchResults(searchResults) {
    return {
        type: 'SET_SEARCH_RESULTS',
        searchResults: searchResults
    }
}

export function resetSearchResults() {
    return {
        type: 'RESET_SEARCH_RESULTS'
    }
}