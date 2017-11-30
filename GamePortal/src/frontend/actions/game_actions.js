export function addGameSpec(gameSpec) {
    return {
        type: 'ADD_GAME_SPEC',
        gameSpec: gameSpec
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

export function setBoardImageURL(url) {
    return {
        type: 'SET_BOARD_IMAGE_URL',
        imageURL: url
    }
}

export function addPiece(piece) {
    return {
        type: 'ADD_PIECE',
        piece: piece
    }
}

export function addPieceInfo(info) {
    return {
        type: 'ADD_PIECE_INFO',
        pieceInfo: info
    }
}