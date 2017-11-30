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

export function setBoardImage(url, height, width) {
    return {
        type: 'SET_BOARD_IMAGE',
        imageURL: url,
        width: width,
        height: height
    }
}

export function setScale(height, width) {
    return {
        type: 'SET_SCALE',
        scaleHeight: height,
        scaleWidth: width
    }
}

export function setBoardDimensions(height, width) {
    return {
        type: 'SET_BOARD_DIMENSIONS',
        height: height,
        width: width
    }
}

export function addPiece(pieceIndex, pieceObject) {
    return {
        type: 'ADD_PIECE',
        index: pieceIndex,
        piece: pieceObject
    }
}

export function addElement(elementId, elementObject) {
    return {
        type: 'ADD_ELEMENT',
        id: elementId,
        element: elementObject
    }
}

export function addImageToElement(elementId, imageIndex, imageURL) {
    return {
        type: 'ADD_IMAGE_TO_ELEMENT',
        elementId: elementId,
        index: imageIndex,
        url: imageURL
    }
}

export function setPieceState(pieceIndex, lastUpdatedOn, newState) {
    return {
        type: 'SET_PIECE_STATE',
        pieceIndex: pieceIndex,
        lastUpdatedOn: lastUpdatedOn,
        newState: newState
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