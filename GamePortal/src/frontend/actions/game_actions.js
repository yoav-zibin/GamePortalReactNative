export function addGameSpec(gameSpec) {
    return {
        type: 'ADD_GAME_SPEC',
        gameSpec: gameSpec
    }
}

export function switchGame(spec) {
    return {
        type: 'SWITCH_GAME',
        game: spec
    }
}

export function setBoardImageURL(url) {
    return {
        type: 'SET_BOARD_IMAGE_URL',
        imageURL: url
    }
}