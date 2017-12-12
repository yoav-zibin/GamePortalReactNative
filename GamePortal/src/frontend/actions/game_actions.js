export function addGameSpecs(gameSpecs) {
    console.log("add game specs action");
    return {
        type: 'ADD_GAME_SPECS',
        gameSpecs: gameSpecs
    }
}

export function resetGameSpecs() {
    return {
        type: 'RESET_GAME_SPECS'
    }
}

export function switchGame(game) {
    return {
        type: 'SWITCH_GAME',
        game: game,
    }
}

export function addMatch(match) {
    return {
        type: 'ADD_MATCH',
        match: match
    }
}

export function resetPieces() {
    return {
        type: 'RESET_PIECES'
    }
}

export function resetPieceStates() {
    return {
        type: 'RESET_STATES'
    }
}

export function resetElements() {
    return {
        type: 'RESET_ELEMENTS'
    }
}